import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import makeFields from './InboxThread/fields';
import addMethods from './InboxThread/methods';
import addHooks from './InboxThread/hooks';
import schema from './InboxThread/schema';
import model from './InboxThread/model'
import tc from './InboxThread/tc'

export type InboxThreadModel = mongoose.Document & {
  inboxThreadId : string,
  inboxThreadData : JSON,
  inboxThreadDataLastFetched : Date,
  inboxThreadDataFetchError: JSON,
  viewerId: string,

  refreshInstagramData: VoidFunction,
}

export const inboxThreadSchema = schema 
export const InboxThread = model;
export const InboxThreadTC = makeFields(tc)
export default InboxThread;