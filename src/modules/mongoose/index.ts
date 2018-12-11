import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

import { default as User, userSchema, UserModel, AuthToken, UserTC } from "../../models/User";

import { 
  default as InstagramAccount, 
  instagramAccountSchema, 
  InstagramAccountModel, 
  InstagramAccountTC 
} from "../../models/InstagramAccount";

import { 
  default as InstagramPost, 
  instagramPostSchema, 
  InstagramPostModel, 
  InstagramPostTC 
} from "../../models/InstagramPost";

import { 
  default as InboxThread, 
  inboxThreadSchema, 
  InboxThreadModel, 
  InboxThreadTC 
} from "../../models/InboxThread";

import { 
  default as InboxThreadItem, 
  inboxThreadItemSchema, 
  InboxThreadItemModel, 
  InboxThreadItemTC 
} from "../../models/InboxThreadItem";

schemaComposer.Query.addFields({

  userMany: UserTC.getResolver('findMany'),

  instagramAccountById : InstagramAccountTC.getResolver('findById'),
  instagramAccountByIds: InstagramAccountTC.getResolver('findByIds'),
  instagramAccountOne  : InstagramAccountTC.getResolver('findOne'),
  instagramAccountMany : InstagramAccountTC.getResolver('findMany'),
  instagramAccountCount: InstagramAccountTC.getResolver('count'),
  instagramAccountConnection: InstagramAccountTC.getResolver('connection'),
  instagramAccountPagination: InstagramAccountTC.getResolver('pagination'),

  instagramPostById : InstagramPostTC.getResolver('findById'),
  instagramPostByIds: InstagramPostTC.getResolver('findByIds'),
  instagramPostOne  : InstagramPostTC.getResolver('findOne'),
  instagramPostMany : InstagramPostTC.getResolver('findMany'),
  instagramPostCount: InstagramPostTC.getResolver('count'),
  instagramPostConnection: InstagramPostTC.getResolver('connection'),
  instagramPostPagination: InstagramPostTC.getResolver('pagination'),

  inboxThreadById : InboxThreadTC.getResolver('findById'),
  inboxThreadMany : InboxThreadTC.getResolver('findMany'),
  inboxThreadOne: InboxThreadTC.getResolver('findOne'),

  inboxThreadItemMany : InboxThreadItemTC.getResolver('findMany'),
  inboxThreadItemOne : InboxThreadItemTC.getResolver('findOne'),
  
});

schemaComposer.Mutation.addFields({

  instagramAccountCreateOne : InstagramAccountTC.getResolver('createOne'),
  instagramAccountCreateMany: InstagramAccountTC.getResolver('createMany'),
  instagramAccountUpdateById: InstagramAccountTC.getResolver('updateById'),
  instagramAccountUpdateOne : InstagramAccountTC.getResolver('updateOne'),
  instagramAccountUpdateMany: InstagramAccountTC.getResolver('updateMany'),
  instagramAccountRemoveById: InstagramAccountTC.getResolver('removeById'),
  instagramAccountRemoveOne : InstagramAccountTC.getResolver('removeOne'),
  instagramAccountRemoveMany: InstagramAccountTC.getResolver('removeMany'),

});

export default schemaComposer.buildSchema();