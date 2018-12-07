// import defaultContext from './context';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { ApolloServer } from 'apollo-server-express';
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";
import express from 'express';
import { ApolloEngine } from 'apollo-engine';
import { APOLLO_ENGINE_KEY } from "./util/secrets";

const app = express();
let defaultContext = {}

const server = new ApolloServer({
  context: Object.assign(defaultContext, {}),
  typeDefs : [...CustomScalars.keys(),typeDefs],
  resolvers : {
    ...CustomScalars.values(),
    ...resolvers
  },
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
  // queryCache: {
  //   privateFullQueryStore: 'privateResponseMemcache',
  //   publicFullQueryStore: 'publicResponseMemcache',
  // },
  // stores: [{
  //   name: 'publicResponseMemcache',
  //   memcache: {
  //     url: ['127.0.0.1:11211'],
  //   },
  // }, {
  //   name: 'privateResponseMemcache',
  //   memcache: {
  //     url: ['127.0.0.1:11211'],
  //   },

  // }],
  expressApp: app,
  launcherOptions: {
    startupTimeout: 3000,
  },
}, () => {
  /* eslint-disable-next-line */
  console.log('Listening!');
});

export default ()=>engine