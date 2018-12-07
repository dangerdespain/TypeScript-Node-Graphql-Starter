import { default as User, UserModel, AuthToken } from "../../models/User";


export default {
  Query : {
    listUsers(root:null,{}:any){
      return User.find({}, null, { skip: 0 },(err,res)=>{
        if(err) throw(err);
        console.log(res)
        return res;
      })
    }
  },
  Mutation : {

  },
  User : {

  }
}