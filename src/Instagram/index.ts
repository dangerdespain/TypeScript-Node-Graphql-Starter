const Client = require('instagram-private-api').V1;
let CookieStorage = Client.CookieFileStorage
const storage = new CookieStorage(`${__dirname}/../../../.local/cookies/localuser-1.json`);
import Bluebird from 'Bluebird'
import { IG_ADMIN_LOCALFLUENCE_PASSWORD, IG_ADMIN_ABBY_PASSWORD } from '../../util/secrets'
import { default as InstagramAccount, InstagramAccountModel, InstagramAccountTC } from "../../models/InstagramAccount";
import { default as InboxThread, InboxThreadModel, InboxThreadTC } from "../../models/InboxThread";
import { default as InboxThreadItem, InboxThreadItemModel, InboxThreadItemTC } from "../../models/InboxThreadItem";
import { default as InstagramPost, InstagramPostModel, InstagramPostTC } from "../../models/InstagramPost";

import { get, functions, sortBy, find, defaults, set, map } from 'lodash'

import { makeSession, sessionByUsername, sessionByAccountId } from './session'

export default {
  Mutation: {
    broadcastTextToInboxThread : {
      resolve: async(root:any, { inboxThreadId, message }:any)=>{
        let threadInstance = await InboxThread.findOne({ inboxThreadId })
        if(!threadInstance.get('_id')) throw new Error('thread not found');
        let sessionData = await sessionByAccountId(threadInstance.get('inboxThreadData.viewerId'))
        let thread = await Client.Thread.getById(sessionData.session, inboxThreadId)
        thread = await thread.broadcastText(message)
        await threadInstance.refreshInstagramData(sessionData)

        return true
      }
    },
    refreshInstagramProfileByUsername : {
      resolve: async(root:any, { instagramUsername, asAccountId }:any)=>{
        
        let account = await InstagramAccount.findOne({ instagramUsername })
        if(!account && !asAccountId) throw new Error('asAccountId must be specified for missing accounts');
        if(!account) account = await InstagramAccount.create({ instagramUsername });
        let admin = await account.getAdminUser(asAccountId)
        let sessionData = await sessionByAccountId(admin.get('instagram'))

        await admin.refreshProfileByUsername(sessionData, instagramUsername)
        
        return true
      }
    },

    // refreshOldestPostsFromFollowers : {
    //   resolve : async(root:any,{ accountId }:any)=>{
    //     // let user = await InstagramAccount.findOne({ instagram : accountId })
    //     // let sessionData = await sessionByAccountId(user.get('instagram'))
    //     // if(!user.get('isAdminAccount')) throw new Error('can only refresh friend feeds for admin users')
    //     // return user.
    //   }
    // },

    refreshInstagramInboxFeed: {
      // resolve: async(root:any, { limit = 20 }:any)=>{
      //   let sessionData = await sessionByAccountId(threadInstance.get('inboxThreadData.viewerId'))

      //   let sessionData = get(sessions,threadInstance.get('inboxThreadData.viewerId'))
      //   if(!get(sessionData,'session')) throw new Error('admin instagram user session has not been initialized')
      //   let feed = new Client.Feed.Inbox(sessionData.session, limit)
      //   let threadsData = await feed.get()
      //   await Bluebird.map(threadsData,thread=>(
      //     InboxThread.findOneAndUpdate({ 
      //       inboxThreadId : get(thread,'id'),
      //       viewerId : get(thread,'_params.viewerId'), 
      //     }, {
      //       inboxThreadDataFetchError : null,
      //       inboxThreadDataLastFetched : new Date(),
      //       inboxThreadData : { ...get(thread,'_params'), users : get(thread,'_params.users',[]) }
      //     }, { 
      //       upsert : true 
      //     })
      //   ))
      //   return true
      // }
    },

    refreshInstagramPostsFeed: {
      resolve: async(root:any, { accountId, asAccountId }:any)=>{
        let user = await InstagramAccount.findOne({ instagram : accountId })
        if(!user.get('_id')) throw new Error('user not found')
        let admin = await user.getAdminUser(asAccountId)
        // console.log(admin)
        let sessionData = await sessionByAccountId(admin.get('instagram'))
        
        await admin.refreshInstagramPostsFeed(sessionData, accountId)

        return true
      }
    },

    initSession : {
      resolve: async (root:any, { instagramUsername }:any, context:any) => {
        await sessionByUsername(instagramUsername)
        return true
      },
    },

    refreshSessionAccountData : {
      resolve: async(root:any, { accountId }:any)=>{
        let accountInstance = await InstagramAccount.findOne({ instagram : accountId })
        let sessionData = await sessionByAccountId(accountId)
        console.log(sessionData)
        await accountInstance.refreshSessionProfile(sessionData)
        return true
      }
    },

    refreshFollowingFeed : {
      resolve: async(root:any, { accountId }:any)=>{
        let accountInstance = await InstagramAccount.findOne({ instagram : accountId })
        console.log(accountInstance)
        let sessionData = await sessionByAccountId(accountId)
        console.log(sessionData)
        await accountInstance.refreshFollowingFeed(sessionData)
        return true
      }
    },

    followAccountById : {
      resolve: async(root:any, { asAccountId, accountId }:any)=>{
        let adminInstance = await InstagramAccount.findOne({ instagram : asAccountId, isAdminAccount : true })
        if(!adminInstance) throw new Error('no such admin found');
        let sessionData = await sessionByAccountId(asAccountId)
        await adminInstance.followByAccountId(sessionData, accountId)
        return true
      }
    },

    refreshInboxThreadById : {
      resolve: async(root:any, { inboxThreadId }:any)=>{
        let threadInstance = await InboxThread.findOne({ inboxThreadId })
        let sessionData = await sessionByAccountId(threadInstance.get('inboxThreadData.viewerId'))
        await threadInstance.refreshInstagramData(sessionData)
        return true
      }
    },
    
  },
  Query: {
    searchInstagram : {
      resolve: async (root:any, { asAccountId, search }:any)=>{
        let accountInstance = await InstagramAccount.findOne({ instagram : asAccountId })
        let sessionData = await sessionByAccountId(asAccountId)
        let results = await Client.search(sessionData.session, search)
        console.log(results.users[0])
        return map(get(results,'users'),({ user }:any)=>user._params)
        // console.log(sessionData)
        // await accountInstance.refreshFollowingFeed(sessionData)
      }
    },
    // searchUsers : {
    //   resolve : async function(root:any, { instagramUsername }:any){
    //     console.log(instagramUsername)
    //     let search = await InstagramAccount.find(
    //       { $text : { $search : instagramUsername } },
    //       { score: { $meta: "textScore" } }
    //     )
    //     // let search = await InstagramAccount.runCommand("text", { instagramUsername })
    //     // let search = await new Promise(res=>{
    //     // })
    //     console.log(search)
    //     return search
    //   }
    // },
    getInbox : {
      resolve: async (root:any, { accountId }:any) => {
        let threads = await InboxThread.find({
          $or : [
            { 'inboxThreadData.viewerId' : { $eq : accountId } },
            { 'inboxThreadData.users' : { $in : [accountId] } },
          ]
        })
        // console.log(threads[0])
        return { threads }
      
      },
    }
  },
};
