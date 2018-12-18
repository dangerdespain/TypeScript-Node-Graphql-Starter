const Client = require('instagram-private-api/client/v1');
import Bluebird from 'Bluebird'
import { IG_ADMIN_LOCALFLUENCE_PASSWORD, IG_ADMIN_ABBY_PASSWORD } from '../../../util/secrets'

import { get, functions, sortBy, find, defaults, set, map, uniq, indexOf, concat, findIndex, omit } from 'lodash'

import { makeSession, sessionByUsername, sessionByAccountId } from '../session'

export default {
  instagramFollowAccountById : {
    resolve: async (root:any, { asAccountId, accountId }:any)=>{
      let sessionData = await sessionByAccountId(asAccountId)
      let relationship = await Client.Relationship.create(sessionData.session,accountId)
      return true
    }
  },
  broadcastTextToThread : {
    resolve: async (root:any, { asAccountId, threadId, message }:any)=>{
      let sessionData = await sessionByAccountId(asAccountId)
      let thread = await Client.Thread.getById(sessionData.session, threadId)
      thread = await thread.broadcastText(message)
      // console.log(thread)
      return true
    }
  }
}

