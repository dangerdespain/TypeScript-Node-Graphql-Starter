import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

import { default as User, userSchema, UserModel, AuthToken, UserTC } from "../../models/User";

schemaComposer.Query.addFields({
  userMany: UserTC.getResolver('findMany'),
});

export default schemaComposer.buildSchema();