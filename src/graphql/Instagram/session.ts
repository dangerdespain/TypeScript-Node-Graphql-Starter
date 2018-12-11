const Client = require('instagram-private-api').V1;
// import file from '../cookies/localuser-1.json'
let CookieStorage = Client.CookieFileStorage
// CookieStorage.prototype.putCookie = function(cookie, cb) { console.log(cookie); return new Promise(res=>res) }
// CookieStorage.prototype.getAllCookies = function(cookie, cb) { console.log(cookie); return new Promise(res=>res) }
// CookieStorage.prototype.removeCookie = function removeCookie(domain, path, key, cb) { console.log(domain,path,key); return new Promise(res=>res) }
// CookieStorage.prototype.removeCookies = function removeCookies(domain, path, key, cb) { console.log(domain,path,key); return new Promise(res=>res) }
const storage = new CookieStorage(`${__dirname}/../../../.local/cookies/localuser-1.json`);
import Bluebird from 'Bluebird'
import { IG_ADMIN_LOCALFLUENCE_PASSWORD, IG_ADMIN_ABBY_PASSWORD } from '../../util/secrets'
import { default as InstagramAccount, InstagramAccountModel, InstagramAccountTC } from "../../models/InstagramAccount";
import { default as InboxThread, InboxThreadModel, InboxThreadTC } from "../../models/InboxThread";
import { default as InboxThreadItem, InboxThreadItemModel, InboxThreadItemTC } from "../../models/InboxThreadItem";
import { default as InstagramPost, InstagramPostModel, InstagramPostTC } from "../../models/InstagramPost";

import { get, functions, sortBy, find, defaults, set } from 'lodash'

let sessions = {
  '9392310605' : {
    accountId : '9392310605',
    instagramUsername : 'localfluence.abby',
    session : null,
    storage : new CookieStorage(`${__dirname}/../../../.local/cookies/localuser-1.json`),
    password : IG_ADMIN_ABBY_PASSWORD,
    device : new Client.Device('localfluence.abby')
  }
}
export const makeSession = async (existingSessionData:any)=>{
  if(!existingSessionData) throw new Error('user is not configured');
  
  const { 
    storage, instagramUsername, password, accountId, 
    device = new Client.Device(instagramUsername), 
  } = existingSessionData

  let account = await InstagramAccount.findOne({ instagramUsername })
  if(!account) account = await InstagramAccount.create({ 
    instagramUsername,
    isAdminAccount : true,
    instagram : accountId,
  })

  await account.update({ adminInstagramAccount : account.get('_id') })

  await Client.Session.create(device, existingSessionData.storage, instagramUsername, password)
  .then(async (session:any) => {

    existingSessionData = defaults({
      _id : account.get('_id'),
      accountId,
      session,
      instagramUsername,
      password,
    },get(sessions,accountId,{}))

    // let session = existingSessionData 

  })
  
  set(sessions,accountId,existingSessionData)

  if(!account.get('instagram')){
    try {
      let { _params, _id } = await Client.Account.searchForUser(existingSessionData.session, instagramUsername)
      await account.update({ 
        profileData : _params, 
        profileDataLastFetched : new Date(),
        profileDataFetchError : null,
        instagram : _params.id, 
        adminInstagramAccount : account.get('_id') 
      })
    }catch(e){
      await account.update({ profileDataFetchError : e })
    }
  }

  let accountData = await Client.Account.showProfile(existingSessionData.session)

  await account.update({
    accountDataLastFetched : new Date(),
    accountData
  })

  return existingSessionData
}

export const sessionByUsername = async(instagramUsername:String)=>{

  let existingSessionData = find(sessions,{ instagramUsername })
  if(!existingSessionData) throw new Error('user is not configured');
  if(existingSessionData && existingSessionData.session !== null) return existingSessionData;
  return await makeSession(existingSessionData)
  
}

export const sessionByAccountId = async(accountId:String)=>{
  if(!accountId) throw new Error('no account id specified')
  let existingSessionData = find(sessions,{ accountId : accountId.toString()})
  if(!existingSessionData) throw new Error('user is not configured');
  if(existingSessionData && existingSessionData.session !== null) return existingSessionData;
  
  return await makeSession(existingSessionData)
  // if(!existingSessionData) throw new Error('session is not initialized');
  // return existingSessionData
  
}

// export const getAdminForAccountId = async function(accountId:String){
//   console.log('here')
//   console.log('here')
//   let admin = this.adminInstagramId ? (
//     await InstagramAccount.findById(this.adminInstagramId)
//     ) : (
//       await InstagramAccount.findOne({ instagram : asAccountId })
//       )
//       console.log('there')

//   if(!admin.get('_id')) throw new Error('admin user not found');
//   let sessionData = await sessionByAccountId(admin.get('instagram'))
// }