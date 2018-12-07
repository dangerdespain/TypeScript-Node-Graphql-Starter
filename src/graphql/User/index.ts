import { default as User, UserModel, AuthToken, UserTC } from "../../models/User";

export default {
  Query : {

  },
  Mutation : {

  },
  User:{
    id : {
      fragment: `... on User { _id }`,
      resolve({ _id }:any){ return _id },
    }
  },
}