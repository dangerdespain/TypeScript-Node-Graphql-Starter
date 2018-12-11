import addMethods from './methods'
import mongoose from "mongoose";
import addHooks from './hooks';

const userSchema = addMethods(
  new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  
    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,
  
    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String
    }
  }, { 
    timestamps: true, usePushEach: true 
  })
);

addHooks(userSchema);

export default userSchema