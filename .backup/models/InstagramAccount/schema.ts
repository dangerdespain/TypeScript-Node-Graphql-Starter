import addMethods from './methods'
import mongoose from "mongoose";
import addHooks from './hooks';
var textSearch = require('mongoose-text-search');

const schema = addMethods(
  new mongoose.Schema({
    instagramUsername: { type: String, unique: true },
   
    accountData : { type : JSON, default : {} },
    accountDataLastFetched: Date,
    accountDataFetchError: JSON,

    profileData : { type : JSON, default : {} },
    profileDataLastFetched: Date,
    profileDataFetchError: JSON,
   
    isAdminAccount : { type : Boolean, default : false },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    
    instagram: String,
  
    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String
    },

    adminInstagramAccount : { type: mongoose.Schema.Types.ObjectId, ref: 'InstagramAccount' },
    adminInstagramId : String,
    following: [String],
  }, { 
    timestamps: true, usePushEach: true 
  })
);

addHooks(schema);

schema.plugin(textSearch);
schema.index({ instagramUsername : 'text' });

export default schema