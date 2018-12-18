import mongoose from "mongoose";

export default (schema:any)=>{

  // schema.refreshProfile = ()=>{
  //   if(!this.instagram){}
  // }
  // const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  //   bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
  //     cb(err, isMatch);
  //   });
  // };

  // schema.methods.comparePassword = comparePassword;

  // /**
  //  * Helper method for getting user's gravatar.
  //  */
  // schema.methods.gravatar = function (size: number) {
  //   if (!size) {
  //     size = 200;
  //   }
  //   if (!this.email) {
  //     return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  //   }
  //   const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  //   return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
  // };

  return schema
}