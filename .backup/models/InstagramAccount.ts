import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import makeFields from './InstagramAccount/fields';
import addMethods from './InstagramAccount/methods';
import addHooks from './InstagramAccount/hooks';
import schema from './InstagramAccount/schema';
import model from './InstagramAccount/model'
import tc from './InstagramAccount/tc'

export type InstagramAccountModel = mongoose.Document & {
  instagramUsername: string,
  password: string,
  passwordResetToken: string,
  passwordResetExpires: Date,

  profileData : JSON,
  profileDataLastFetched : Date,
  profileDataFetchError: JSON,

  accountData : JSON,
  accountDataLastFetched : Date,
  accountDataFetchError: JSON,

  profile: {
    name: string,
    gender: string,
    location: string,
    website: string,
    picture: string
  },
  isAdminAccount : Boolean
  adminInstagramId : String
  following: [String]
}

export const instagramAccountSchema = schema 
export const InstagramAccount = model;
export const InstagramAccountTC = makeFields(tc)
export default InstagramAccount;