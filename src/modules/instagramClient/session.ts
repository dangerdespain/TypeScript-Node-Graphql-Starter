const Client = require('instagram-private-api/client/v1');
let CookieStorage = Client.CookieFileStorage
import Bluebird from 'Bluebird'
import { IG_ADMIN_LOCALFLUENCE_PASSWORD, IG_ADMIN_ABBY_PASSWORD } from '../../util/secrets'
import { get, functions, sortBy, find, defaults, set } from 'lodash'

let sessions = {
  '9392310605' : {
    accountId : '9392310605',
    instagramUsername : 'localfluence.abby',
    session : null,
    storage : new CookieStorage(`${__dirname}/../../../.local/cookies/localuser-1.json`),
    password : IG_ADMIN_ABBY_PASSWORD,
    device : new Client.Device('localfluence.abby'),
    // proxy : 'http://black-pearl.local:8099'
  }
}
export const makeSession = async (existingSessionData:any)=>{
  if(!existingSessionData) throw new Error('user is not configured');
  
  const { 
    storage, instagramUsername, password, accountId, 
    device = new Client.Device(instagramUsername), 
  } = existingSessionData

  let predefinedSession = get(sessions,accountId,{})
  await Client.Session.create(device, predefinedSession.storage, instagramUsername, password, predefinedSession.proxy)
  .then(async (session:any) => {
    
    existingSessionData = defaults({
      accountId,
      session,
      instagramUsername,
      password,
    },predefinedSession)
  })
  
  set(sessions,accountId,existingSessionData)

  return existingSessionData
}

export const sessionByUsername = async(instagramUsername:String)=>{

  let existingSessionData = find(sessions,{ instagramUsername })
  if(!existingSessionData) throw new Error('user is not configured');
  if(existingSessionData && existingSessionData.session !== null) return existingSessionData;
  let sessionData = makeSession(existingSessionData)
  return sessionData
  
}

export const sessionByAccountId = async(accountId:String)=>{
  if(!accountId) throw new Error('no account id specified')
  let existingSessionData = find(sessions,{ accountId : accountId.toString()})
  if(!existingSessionData) throw new Error('user is not configured');
  if(existingSessionData && existingSessionData.session !== null) return existingSessionData;
  
  let sessionData = makeSession(existingSessionData)
  return sessionData
}
