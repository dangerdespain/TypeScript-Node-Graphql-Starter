import mongoose from "mongoose";
import InstagramAccount from '../InstagramAccount'
import InstagramPost from '../InstagramPost'
import Bluebird from 'Bluebird'
import { get, functions, sortBy, map, uniq } from 'lodash'
const Client = require('instagram-private-api/client/v1');
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export default (schema:any)=>{

  schema.methods.refreshSessionProfile = async ({ accountId, session }:any)=>{

    let accountData = await Client.Account.showProfile(session)
    let account = await InstagramAccount.findOneAndUpdate({ 
      instagram : accountId 
    }, {
      accountDataLastFetched : new Date(),
      accountDataFetchError : null,
      accountData
    }, { 
      upsert : true 
    })

    console.log(accountData)
    return account
    
  }

  schema.methods.followByAccountId = async function(sessionData, accountId){
    if(!this.isAdminAccount) throw new Error('this method can only be used by admin users')
    return Client.Relationship.create(sessionData.session,accountId)
  }

  schema.methods.refreshProfileByUsername = async function(sessionData:any, instagramUsername:String){
    if(!this.isAdminAccount) throw new Error('this method can only be used by admin users')
    let account = await InstagramAccount.findOne({ instagramUsername })
    if(!account.get('_id')) account = await InstagramAccount.create({ 
      instagramUsername,
      adminInstagramId : get(sessionData,'accountId'),
      adminInstagramAccount : this._id,
    })
    
    try {
      let { _params, _id } = await Client.Account.searchForUser(sessionData.session, instagramUsername)
      await account.update({ 
        profileData : _params, 
        profileDataLastFetched : new Date(),
        profileDataFetchError : null,
        instagram : _params.id, 
        adminInstagramAccount : sessionData._id,
        adminInstagramId : sessionData.accountId
      })
    }catch(e){
      console.log(e)
      await account.update({ profileDataFetchError : e })
    }
  }

  schema.methods.getAdminUser = async function (asAccountId?:String){
    let admin = asAccountId ? (
      await InstagramAccount.findOne({ instagram : asAccountId })
    ) : (
      await InstagramAccount.findById(this.adminInstagramId)
    )
  
    if(!admin) throw new Error('admin user not found');
    return admin
  }

  schema.methods.refreshInstagramPostsFeed = async function(sessionData:any, accountId:any){
    accountId = accountId || this.instagram
    let feed = new Client.Feed.UserMedia(sessionData.session, accountId)
    let feedData
    let newPosts = []
    let newPostsPromise = (feedData:any)=>Bluebird.map(feedData,feedItem=>(
      InstagramPost.findOneAndUpdate({ 
        instagramPostId : get(feedItem,'id') 
      }, {
        postDataFetchError : null,
        postDataLastFetched : new Date(),
        takenAt : get(feedItem,'_params.takenAt'),
        postData : get(feedItem,'_params',{}),
        // adminInstagramAccount : get(sessionData,'_id'),
        // instagramAccount : this._id,
        instagramAccountId : this.instagram,
      }, { 
        upsert : true 
      })
    ),{ concurrency : 10 })

    let caughtUpInFeed = false;
    let count = 0;

    while(count < 5 && !caughtUpInFeed){
      feedData = await feed.get()
      feedData = sortBy(feedData,item=>get(item,'_params.takenAt'))
      let lastFeedData = feedData.pop()
      let newPosts = await newPostsPromise(feedData)
      let lastPost = await InstagramPost.findOne({ instagramPostId : get(lastFeedData,'id') })
      if(lastPost){
        caughtUpInFeed = true
        await Bluebird.delay(1000 + Math.floor(Math.random() * 1500))
      }else{
        await newPostsPromise([lastFeedData])
      }
      count = count + 1;
    }
  }
 

  schema.methods.refreshFollowingFeed = async function(sessionData:any){
    let feed = new Client.Feed.AccountFollowing(sessionData.session, this.instagram)
    let feedData
    let newFollowing:any[] = []

    let newFollowingPromise = (feedData:any)=>Bluebird.map(feedData,async feedItem=>{
      let account = await InstagramAccount.findOne({ 
        instagram : get(feedItem,'id'),
      })
      if(!account || !account.get('_id')){
        account = await InstagramAccount.create({ 
          instagram : get(feedItem,'id').toString(),
          instagramUsername :  get(feedItem,'_params.username'),
          adminInstagramId: sessionData.accountId,
          instagramAdminAccount : sessionData._id,
          profileData : Object.assign({},account.get('profileData')||{},get(feedItem,'_params')),
          profileDataFetchError : null,
          profileDataLastFetched : new Date(),
        });
      }
      if(account.get('adminInstagramAccount'))
      return
    },{ concurrency : 10 })

    let caughtUpInFeed = false;
    let count = 0;

    while(count < 10 && !caughtUpInFeed){
      feedData = await feed.get()
      newFollowing = newFollowing.concat(feedData)
      let lastFeedData = feedData.pop()
      let newPosts = await newFollowingPromise(feedData)
      let lastPost = await InstagramAccount.findOne({ instagramPostId : get(lastFeedData,'id') })
      if(lastPost){
        caughtUpInFeed = true
        await Bluebird.delay(1000 + Math.floor(Math.random() * 1500))
      }else{
        await newFollowingPromise([lastFeedData])
      }
      count = count + 1;
    }

    await InstagramAccount.findOneAndUpdate({
      _id : sessionData._id
    },{
      following: uniq(map(newFollowing,({ id })=>id))
    }) 

    return newFollowing
  }
 
  return schema
}