const config = require('../../../config')
const { get } = require('lodash')
const PostGraphileConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");

export default {
  graphqlRoute : '/postgraphile',
  graphiqlRoute : '/postgraphiql',
  graphiql : true,
  pgDefaultRole : 'postgres',
  disableQueryLog : true,
  disableDefaultMutations : false,
  // disableDefaultMutations : true,
  dynamicJson : true,
  queryCacheMaxSize : 50,
  jwtTokenIdentifier : 'public.jwt_token',
  jwtSecret : config.jwtauth.secret,
  jwtVerifyOptions : {
    algorithm: config.jwtauth.algorithm 
  },
  appendPlugins : [
    PostGraphileConnectionFilterPlugin,
  ]
}