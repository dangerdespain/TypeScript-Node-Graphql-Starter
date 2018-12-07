import { printSchema } from 'graphql/utilities'
import { writeFileSync } from 'fs'
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-express';
import CustomScalars, { RegularExpressionFactory } from "@saeris/graphql-scalars";
import express from 'express';
import { ApolloEngine } from 'apollo-engine';
import { APOLLO_ENGINE_KEY, APOLLO_ENGINE_PORT } from "../../util/secrets";
import bodyParser from 'body-parser'
import pgSchema, { makeRemoteSchema, makePostgraphileMiddleware } from '../postgraphile' 


const app = express();
let defaultContext = {}

// let remotePgSchema = makeRemoteSchema({})

let pgMiddleware = makePostgraphileMiddleware({})
app.get('/postgraphile',bodyParser.json(),pgMiddleware)
app.post('/postgraphile',bodyParser.json(),pgMiddleware)

export const buildServer = ({ schema, context }:any)=>{

  const server = new ApolloServer({
    schema,
    context: ()=>Object.assign({}, defaultContext, context),
    tracing: true,
    playground: true,
    cacheControl: true,
  });

  server.applyMiddleware({ app });

  const engine = new ApolloEngine({
    apiKey: APOLLO_ENGINE_KEY,
  });

  engine.listen({
    port: APOLLO_ENGINE_PORT,
    graphqlPaths: ['/graphql'],
    expressApp: app,
    launcherOptions: {
      startupTimeout: 3000,
    },
  }, () => {
    /* eslint-disable-next-line */
    console.log('Listening!');
  });

  return { server, engine }
}

export default buildServer