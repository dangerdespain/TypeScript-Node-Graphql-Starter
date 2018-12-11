import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

import makeFields from './User/fields';
import addMethods from './User/methods';
import addHooks from './User/hooks';
import schema from './User/schema';
import model from './User/model'
import tc from './User/tc'

export type UserModel = mongoose.Document & {
  email: string,
  password: string,
  passwordResetToken: string,
  passwordResetExpires: Date,

  facebook: string,
  tokens: AuthToken[],

  profile: {
    name: string,
    gender: string,
    location: string,
    website: string,
    picture: string
  },

  comparePassword: comparePasswordFunction,
  gravatar: (size: number) => string
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export type AuthToken = {
  accessToken: string,
  kind: string
};

export const userSchema = schema 
export const User = model;
export const UserTC = makeFields(tc)
export default User;