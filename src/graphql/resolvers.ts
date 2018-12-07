let response = 'hello'
import { keys } from 'lodash'
import User from './User'
import { omit } from 'lodash'
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";

const resolvers = {
  Mutation: {
    ...User.Mutation,
    debug: {
      resolve(root:null,args:any,context:any,info:any){
        return { args, context : keys(context) }
      }
    }
  },
  Query: {
    ...User.Query,    
    sayHello : {
      resolve() {
        return { id: '12345', response: `${response} from ${new Date()}` };
      }
    }
  },
  ...CustomScalars.values(),
  ...omit(User,['Mutation','Query'])
};

export default resolvers
