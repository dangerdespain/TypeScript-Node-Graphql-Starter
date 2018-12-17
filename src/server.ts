import errorHandler from "errorhandler";
import bodyParser from 'body-parser'
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';

import app from "./app";

import pgSchema, { makeRemoteSchema, makePostgraphileMiddleware } from './modules/postgraphile' 
import makeApolloServer from './modules/apolloServer'
import mongooseSchema from './modules/mongoose';

import schema from './graphql/schema'
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';


// const app = express();
let defaultContext = {}

let remotePgSchema = makeRemoteSchema({})

let pgMiddleware = makePostgraphileMiddleware({})
app.get('/postgraphiql',bodyParser.json(),pgMiddleware)
app.get('/postgraphile',bodyParser.json(),pgMiddleware)
app.post('/postgraphile',bodyParser.json(),pgMiddleware)

const apolloServer = makeApolloServer({
  app,
  schema : mergeSchemas({
    schemas : [
      remotePgSchema,
      typeDefs([]),
      mongooseSchema,
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
