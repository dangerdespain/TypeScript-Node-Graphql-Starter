'use strict'

module.exports = {

  defaults : {
    express: (api) => ({
      host : 'localhost',
      port : 3000,
      wsPort : 5000,
      enableSubscriptions : true,
      enableCors : true,
      verbose : true,
      enableGraphiql : true,
      graphqlRoute : '/graphql',
      graphiqlRoute : '/graphiql',
      subscriptionsRoute : '/subscriptions',
      allowUnauthenticatedRequests : true
    })
  },

  test : {
    express: (api) => ({
      port : 3002,
      wsPort : 5001,
    })
  },

  production : {
    express: (api) => ({
      host : 'dashboard.localfluence.com',
      secure : true,
    })
  },

  staging : {
    express: (api) => ({
      host : 'staging.localfluence.com',
      secure : true,
    })
  }

}
