// import defaultContext from './context';
import { printSchema } from 'graphql/utilities'
import { writeFileSync } from 'fs'
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";
import express from 'express';
import { ApolloEngine } from 'apollo-engine';
import { APOLLO_ENGINE_KEY } from "./util/secrets";

import schema from './graphql/schema'
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import mongooseSchema from './generated/mongoose';

const app = express();
let defaultContext = {}

writeFileSync(`${__dirname}/../src/generated/mongoose.graphql`,printSchema(mongooseSchema), 'utf-8')

const server = new ApolloServer({
  schema : mergeSchemas({
    schemas : [mongooseSchema,typeDefs([mongooseSchema])],
    resolvers,
  }),
  context: ()=>Object.assign({}, defaultContext),
  tracing: true,
  playground: true,
  cacheControl: true,
});

server.applyMiddleware({ app });

const engine = new ApolloEngine({
  apiKey: APOLLO_ENGINE_KEY,
});

engine.listen({
  port: 4000,
  graphqlPaths: ['/graphql'],
  expressApp: app,
  launcherOptions: {
    startupTimeout: 3000,
  },
}, () => {
  /* eslint-disable-next-line */
  console.log('Listening!');
});

export default ()=>engine