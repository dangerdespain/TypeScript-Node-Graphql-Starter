import addMethods from './methods'
import mongoose from "mongoose";
import addHooks from './hooks';

const inboxThreadItemSchema = addMethods(
  new mongoose.Schema({    
    inboxThreadId : String,
    inboxThreadItemId : String,
    inboxThreadItemData : JSON,
    inboxThreadItemDataLastFetched : Date,
    inboxThreadItemDataFetchError: JSON,
    inboxThread : { type: mongoose.Schema.Types.ObjectId, ref: 'InboxThread' },
    adminInstagramAccount : { type: mongoose.Schema.Types.ObjectId, ref: 'InstagramAccount' },
    participants : [{ type: mongoose.Schema.Types.ObjectId, ref: 'InstagramAccount' }],
  }, { 
    timestamps: true, usePushEach: true 
  })
);

addHooks(inboxThreadItemSchema);

export default inboxThreadItemSchema