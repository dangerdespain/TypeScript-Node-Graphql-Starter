'use strict'

module.exports = {

  defaults : {
    postgraphile: () => ({
      port : 3500,
      host : 'localhost'
    })
  },

  test : {
    postgraphile: () => ({
      port : 3501,
      host : '192.168.99.100'
    })
  }
  
}