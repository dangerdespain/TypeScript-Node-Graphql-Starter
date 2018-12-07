let response = 'hello'

import User from './User'
import { omit } from 'lodash'

export default {
  Mutation: {
    ...User.Mutation,
    changeResponse : (root:null, { newResponse }:any)=>{ 
      response = newResponse
      return { id : '801', response }
    }
  },
  Query: {
    ...User.Query,
    sayHello() {
      console.log('responding hello')
      return { id: 1, response: `${response} from ${new Date()}` };
    }
  },
  ...omit(User,['Mutation','Query'])
};
