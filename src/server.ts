import errorHandler from "errorhandler";
import bodyParser from 'body-parser'
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';

import app from "./app";

import pgSchema, { makeRemoteSchema, makePostgraphileMiddleware } from './modules/postgraphile' 
import makeApolloServer from './modules/apolloServer'
import mongooseSchema from './modules/mongoose';
import instagramClientSchema from './modules/instagramClient';
import sessionSchema from './modules/session';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

let defaultContext = {}

// let remotePgSchema = makeRemoteSchema({})

// let pgMiddleware = makePostgraphileMiddleware({})
// app.get('/postgraphiql',bodyParser.json(),pgMiddleware)
// app.get('/postgraphile',bodyParser.json(),pgMiddleware)
// app.post('/postgraphile',bodyParser.json(),pgMiddleware)

const apolloServer = makeApolloServer({
  app,
  schema : mergeSchemas({
    schemas : [
      // remotePgSchema,
      // mongooseSchema,
      // instagramClientSchema,
      sessionSchema,
      typeDefs([]),
    ],
    resolvers,
  }),
  context: ()=>Object.assign({}, defaultContext),
});

app.use(errorHandler());
apolloServer.applyMiddleware({ app })
/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
