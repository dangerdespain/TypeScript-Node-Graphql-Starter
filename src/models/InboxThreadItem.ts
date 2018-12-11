
import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import makeFields from './InboxThreadItem/fields';
import addMethods from './InboxThreadItem/methods';
import addHooks from './InboxThreadItem/hooks';
import schema from './InboxThreadItem/schema';
import model from './InboxThreadItem/model'
import tc from './InboxThreadItem/tc'

export type InboxThreadItemModel = mongoose.Document & {
  inboxThreadId : string,
  inboxThreadItemId : string,
  inboxThreadItemData : JSON,
  inboxThreadItemDataLastFetched : Date,
  inboxThreadItemDataFetchError: JSON,
}

export const inboxThreadItemSchema = schema 
export const InboxThreadItem = model;
export const InboxThreadItemTC = makeFields(tc)
export default InboxThreadItem;