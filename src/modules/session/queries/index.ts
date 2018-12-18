import Bluebird from 'Bluebird'
// import { IG_ADMIN_LOCALFLUENCE_PASSWORD, IG_ADMIN_ABBY_PASSWORD } from '../../../util/secrets'
import { mockSession } from '../mocks'

import { get } from 'lodash'

export default {
  
  getSession : {
    resolve: async (root:any, { }:any)=>{
      return mockSession
    }
  },

}

