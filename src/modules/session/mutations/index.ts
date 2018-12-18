import Bluebird from 'Bluebird'
import { get } from 'lodash'

import { mockSession } from '../mocks'
// import { IG_ADMIN_LOCALFLUENCE_PASSWORD, IG_ADMIN_ABBY_PASSWORD } from '../../../util/secrets'

export default {
  authenticateByEmail : {
    resolve: async (root:any, { email, password }:any)=>{
      return mockSession
    }
  },
}

