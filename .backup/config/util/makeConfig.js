// this is a refactored version of Actionhero's config loader

const recursive = require("recursive-readdir")
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const _ = require('lodash')

module.exports = (configFiles, env)=>{

  function isPlainObject(o){
    const safeTypes = [Boolean, Number, String, Function, Array, Date, RegExp, Buffer]
    const safeInstances = ['boolean', 'number', 'string', 'function']
    const expandPreventMatchKey = '_toExpand' // set `_toExpand = false` within an object if you don't want to expand it
    let i

    if (!o) { return false }
    if ((o instanceof Object) === false) { return false }
    for (i in safeTypes) {
      if (o instanceof safeTypes[i]) { return false }
    }
    for (i in safeInstances) {
      if (typeof o === safeInstances[i]) { return false } //eslint-disable-line
    }
    if (o[expandPreventMatchKey] === false) { return false }
    return (o.toString() === '[object Object]')
  }

  let api = {}
  api.config = {
    env
  }

  function hashMerge(a, b, arg){
    let c = {}
    let i
    let response
    
    for (i in a) {
      if (isPlainObject(a[i]) && Object.keys(a[i]).length > 0) {
        c[i] = hashMerge(c[i], a[i], arg)
      } else {
        if (typeof a[i] === 'function') {
          response = a[i](arg)
          if (isPlainObject(response)) {
            c[i] = hashMerge(c[i], response, arg)
          } else {
            c[i] = response
          }
        } else {
          c[i] = a[i]
        }
      }
    }
    for (i in b) {    

      if (isPlainObject(b[i]) && Object.keys(b[i]).length > 0) {
        c[i] = hashMerge(c[i], b[i], arg)
      } else {
        if (typeof b[i] === 'function') {
          response = b[i](arg)
          if (isPlainObject(response)) {
            c[i] = hashMerge(c[i], response, arg)
          } else {
            c[i] = response
          }
        } else {
          c[i] = b[i]
        }
      }
    }
    return c
  }

  let loadRetries = 0
  let loadErrors = {}
  for (let i = 0, limit = configFiles.length; (i < limit); i++) {
    const localConfig = configFiles[i]
    try {
      // attempt configuration file load
      // const localConfig = require(f)s
      if (localConfig['defaults']) { api.config = hashMerge(api.config, localConfig['defaults'], api) }
      if (localConfig[env]) { api.config = hashMerge(api.config, localConfig[env], api) }
      // configuration file load success: clear retries and
      // errors since progress has been made
      loadRetries = 0
      loadErrors = {}
    } catch (error) {
      // error loading configuration, abort if all remaining
      // configuration files have been tried and failed
      // indicating inability to progress
      loadErrors[localConfig] = {error: error, msg: error.toString()}
      if (++loadRetries === limit - i) {
        Object.keys(loadErrors).forEach((e) => {
          console.log(loadErrors[e].error.stack)
          delete loadErrors[e].error
        })

        throw new Error('Unable to load configurations, errors: ' + JSON.stringify(loadErrors))
      }
      // adjust configuration files list: remove and push
      // failed configuration to the end of the list and
      // continue with next file at same index
      configFiles.push(configFiles.splice(i--, 1)[0])
      // continue
    }

  }

  // We load the config twice. Utilize configuration files load order that succeeded on the first pass.
  // This is to allow 'literal' values to be loaded whenever possible, and then for refrences to be resolved
  configFiles.forEach((localConfig) => {
    if (localConfig['defaults']) { api.config = hashMerge(api.config, localConfig['defaults'], api) }
    if (localConfig[env]) { api.config = hashMerge(api.config, localConfig[env], api) }
  })

  if (api._startingParams && api._startingParams.configChanges) {
    api.config = hashMerge(api.config, api._startingParams.configChanges)
  }

  return api.config
}