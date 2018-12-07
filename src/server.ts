import errorHandler from "errorhandler";
import bodyParser from 'body-parser'

import app from "./app";

import makeApolloServer from './modules/apolloServer'
import mongooseSchema from './modules/mongoose';
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';

import schema from './graphql/schema'
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import pgSchema, { makeRemoteSchema, makePostgraphileMiddleware } from './modules/postgraphile' 

// const app = express();
let defaultContext = {}

let remotePgSchema = makeRemoteSchema({})

let pgMiddleware = makePostgraphileMiddleware({})
app.get('/postgraphile',bodyParser.json(),pgMiddleware)
app.post('/postgraphile',bodyParser.json(),pgMiddleware)

const apolloSserver = makeApolloServer({
  schema : mergeSchemas({
    schemas : [remotePgSchema,mongooseSchema,typeDefs([mongooseSchema])],
    resolvers,
  }),
  context: ()=>Object.assign({}, defaultContext),
});

app.use(errorHandler());

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
