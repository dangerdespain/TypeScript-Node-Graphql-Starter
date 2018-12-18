import { printSchema } from 'graphql/utilities'
import { writeFileSync } from 'fs'
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
const { ApolloServer } = require('apollo-server-express');
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";
import express from 'express';
import { ApolloEngine } from 'apollo-engine';
import { APOLLO_ENGINE_KEY, APOLLO_ENGINE_PORT } from "../../util/secrets";
import bodyParser from 'body-parser'
import pgSchema, { makePostgraphileMiddleware } from '../postgraphile' 


// const app = express();
let defaultContext = {}

// let pgMiddleware = makePostgraphileMiddleware({})
// app.get('/postgraphile',bodyParser.json(),pgMiddleware)
// app.post('/postgraphile',bodyParser.json(),pgMiddleware)

export const makeApolloServer = ({ app, schema, context }:any)=>{

  const server = new ApolloServer({
    schema,
    context: ()=>Object.assign({}, defaultContext, context),
    tracing: true,
    playground: true,
    cacheControl: {
      defaultMaxAge: 5,
    },
  });

  server.applyMiddleware({ app });

  const engine = new ApolloEngine({
    apiKey: APOLLO_ENGINE_KEY,
  });

  app.listen(3001,()=>{

    engine.listen({
      port: APOLLO_ENGINE_PORT,
      graphqlPaths: ['/graphql'],
      expressApp: app,
      launcherOptions: {
        startupTimeout: 5000,
      },
    }, () => {
      /* eslint-disable-next-line */
      console.log('Listening!');
    })
  });

  return server
}

export default makeApolloServer