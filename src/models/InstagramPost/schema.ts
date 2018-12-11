import addMethods from './methods'
import mongoose from "mongoose";
import addHooks from './hooks';

const instagramPostSchema = addMethods(
  new mongoose.Schema({

    postData : { type : JSON, default : {} },
    postDataLastFetched: Date,
    postDataFetchError: JSON,
  
    instagramPostId: String,
    instagramAccountId: String,

    takenAt : Date,
  
    adminInstagramAccount : { type: mongoose.Schema.Types.ObjectId, ref: 'InstagramAccount' },
    instagramAccount : { type: mongoose.Schema.Types.ObjectId, ref: 'InstagramAccount' },

  }, { 
    timestamps: true, usePushEach: true 
  })
);

addHooks(instagramPostSchema);

export default instagramPostSchema