import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import makeFields from './InstagramPost/fields';
import addMethods from './InstagramPost/methods';
import addHooks from './InstagramPost/hooks';
import schema from './InstagramPost/schema';
import model from './InstagramPost/model'
import tc from './InstagramPost/tc'

export type InstagramPostModel = mongoose.Document & {
  postData : JSON,
  postDataLastFetched: Date,
  postDataFetchError: JSON,
  
  takenAt : Date,
  instagramId: String,
  instagramPostId: String,
  
  // adminInstagramPost : { type: mongoose.Schema.Types.ObjectId, ref: 'InstagramPost' },
}

export const instagramPostSchema = schema 
export const InstagramPost = model;
export const InstagramPostTC = makeFields(tc)
export default InstagramPost;