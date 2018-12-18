import addMethods from './methods'
import mongoose from "mongoose";
import addHooks from './hooks';

const inboxThreadSchema = addMethods(
  new mongoose.Schema({    
    inboxThreadId : String,
    inboxThreadData : JSON,
    inboxThreadDataLastFetched : Date,
    inboxThreadDataFetchError: JSON,
    adminInstagramAccount : { type: mongoose.Schema.Types.ObjectId, ref: 'InstagramAccount' },
    participants : [{ type: mongoose.Schema.Types.ObjectId, ref: 'InstagramAccount' }],
    items : { type : JSON, default : [] },
    viewerId: String,
  }, { 
    timestamps: true, usePushEach: true 
  })
);

addHooks(inboxThreadSchema);

export default inboxThreadSchema