const Client = require('instagram-private-api/client/v1');
import Bluebird from 'Bluebird'
import { IG_ADMIN_LOCALFLUENCE_PASSWORD, IG_ADMIN_ABBY_PASSWORD } from '../../../util/secrets'

import { get, functions, sortBy, find, defaults, set, map, uniq, indexOf, concat, findIndex, omit } from 'lodash'

import { makeSession, sessionByUsername, sessionByAccountId } from '../session'

export default {
  
  searchInstagram : {
    resolve: async (root:any, { asAccountId, search }:any)=>{
      let sessionData = await sessionByAccountId(asAccountId)
      let results = await Client.search(sessionData.session, search)
      return map(get(results,'users'),({ user }:any)=>user._params)
    }
  },

  getInstagramProfileData : {
    resolve: async (root:any, { asAccountId, accountId }:any)=>{
      let sessionData = await sessionByAccountId(asAccountId)
      let accountData = await Client.Account.showProfile(sessionData.session)
      return accountData
    }
  },

  getInstagramFollowers : {
    resolve: async (root:any, { asAccountId, cursor, limit }:any)=>{
      let sessionData = await sessionByAccountId(asAccountId)
      let feed = new Client.Feed.AccountFollowing(sessionData.session,sessionData.accountId,limit)
      if(cursor) feed.setCursor(cursor);
      let feedItems = await feed.get()
      return {
        records : feedItems.length,
        isMoreAvailable : feed.isMoreAvailable(),
        cursor : feed.getCursor(),
        accounts : map(feedItems,({ _params })=>_params),
      }
    }
  },
  
  getInstagramFeed : {
    resolve: async (root:any, { asAccountId, accountId, cursor, limit }:any)=>{
      let sessionData = await sessionByAccountId(asAccountId)
      let feed = new Client.Feed.UserMedia(sessionData.session,accountId,limit)
      if(cursor) feed.setCursor(cursor);
      let feedItems = await feed.get()
      return {
        records : feedItems.length,
        isMoreAvailable : feed.isMoreAvailable(),
        cursor : feed.getCursor(),
        items : map(feedItems,({ _params })=>_params),
      }
    }
  },
  
  getInstagramInbox : {
    resolve: async (root:any, { asAccountId, cursor, limit }:any)=>{

      let sessionData = await sessionByAccountId(asAccountId)
      let feed = new Client.Feed.Inbox(sessionData.session,asAccountId,limit)
      if(cursor) feed.setCursor(cursor);
      let feedItems = await feed.get()
      return {
        records : feedItems.length,
        isMoreAvailable : feed.isMoreAvailable(),
        cursor : feed.getCursor(),
        threads : map(feedItems,({ _params, items, accounts })=>({ 
          _params : omit(_params,['users','inviter']), 
          items : map(items,({ _params })=>_params),
          accounts : map(accounts,({ _params })=>_params),
        }))
      }

    }
  },

  getInstagramThread : {
    resolve: async (root:any, { asAccountId, threadId, cursor, limit }:any)=>{

      let sessionData = await sessionByAccountId(asAccountId)
      let feed = new Client.Feed.ThreadItems(sessionData.session,threadId,limit)
      if(cursor) feed.setCursor(cursor);
      let feedItems = await feed.get()
      return {
        records : feedItems.length,
        isMoreAvailable : feed.isMoreAvailable(),
        cursor : feed.getCursor(),
        items : map(feedItems,({ _params })=>_params),
      }

    }
  },
}

