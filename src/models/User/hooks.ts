import bcrypt from "bcrypt-nodejs";
import mongoose from "mongoose";

export default (userSchema:any)=>{
  userSchema.pre("save", function save(next:any) {
    const user = this;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
  });
  
}