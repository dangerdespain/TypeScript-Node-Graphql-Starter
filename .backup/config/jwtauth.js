'use strict'

module.exports = {

  defaults : {
    jwtauth: () => ({
      secret: 'secret',
      algorithm: 'HS512'
    })
  }

}