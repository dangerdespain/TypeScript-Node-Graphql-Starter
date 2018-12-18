let response = 'hello'
import { keys } from 'lodash'
import { omit } from 'lodash'
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";


import User from './User'
// import Instagram from './Instagram'


const resolvers = {
  Mutation: {
    ...User.Mutation,
    // ...Instagram.Mutation,
    debug: {
      resolve(root:null,args:any,context:any,info:any){
        return { args, context : keys(context) }
      }
    }
  },
  Query: {
    ...User.Query,     
    // ...Instagram.Query,     
    sayHello : {
      resolve() {
        return { id: '12345', response: `${response} from ${new Date()}` };
      }
    }
  },
  ...CustomScalars.values(),
  ...omit(User,['Mutation','Query']),
  // ...omit(Instagram,['Mutation','Query']),
};

export default resolvers
