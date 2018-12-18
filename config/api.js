'use strict'

const packageJSON = require('../package.json')

module.exports = {

  defaults : {
    api: (api) => ({
      apiVersion: packageJSON.version,
      serverName: packageJSON.name,
    })
  },

  // test : {
  //   api: (api) => ({

  //   })
  // },

  // production : {
  //   api: (api) => ({
      
  //   })
  // }

}
