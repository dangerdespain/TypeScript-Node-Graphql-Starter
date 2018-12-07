import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

import { default as User, UserModel, AuthToken } from "../models/User";

const UserTC = composeWithMongoose(UserModel, {});

export default {
  Query : {
    // userById: UserTC.getResolver('findById'),
    // userByIds: UserTC.getResolver('findByIds'),
    // userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany'),
    // userCount: UserTC.getResolver('count'),
    // userConnection: UserTC.getResolver('connection'),
    // userPagination: UserTC.getResolver('pagination'),
  },
  Mutation : {

  }
}