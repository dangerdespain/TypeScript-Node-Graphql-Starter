'use strict'

module.exports = {

  defaults : {
    apolloEngine: (api) => ({
      apiKey : 'service:supervitus-ltd:evMGyNzLMDovuT8P1D09yg',
      sessionAuth: {
        header: 'Authorization',
        // tokenAuthUrl: 'https://auth.mycompany.com/engine-auth-check',
      },
      logging: {
        level: "WARN" // Engine Proxy logging level. DEBUG, INFO (default), WARN or ERROR.
      },
      origins : [{
        requestTimeout : '1200000s'
      }]
    })
  },
  
  test : {
    apolloEngine: (api) => ({

    })
  },
  
  production : {
    apolloEngine: (api) => ({
      
    })
  }
  
}