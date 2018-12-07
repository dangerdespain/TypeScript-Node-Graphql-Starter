import { createPostGraphileSchema } from 'postgraphile'
import transforms from './transforms'
import { defaults } from 'lodash'
import defaultPostgraphileConfig from './defaultConfig'
import { makeExecutableSchema, mergeSchemas, makeRemoteExecutableSchema, transformSchema } from 'graphql-tools';

import { postgraphile } from 'postgraphile'

import {GraphQLSchema} from 'graphql';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import fetch from 'node-fetch';
import defaultTransforms from './transforms'
import { POSTGRES_URI, APOLLO_ENGINE_PORT } from "../../util/secrets";

import app from '../../app'

let pgConfig = POSTGRES_URI

type makeSchemaInput = {
  graphqlRoute?: string,
  transforms?: any[],
}
export const makePostgraphileMiddleware = ({ graphqlRoute = '/postgraphile' }:makeSchemaInput)=>postgraphile(
  pgConfig, 
  ['public'], 
  Object.assign({},defaultPostgraphileConfig,{ graphqlRoute })
)

const makeSchema = ()=>{

  let postGraphileSchema
  createPostGraphileSchema(
    // `postgres://${username}${password ? `:${password}` : ''}@${host}:${port}/${database}`,
    pgConfig,
    ['public'],
    defaults(defaultPostgraphileConfig)
  )
  .then((schema:any)=>{
    postGraphileSchema = transformSchema(schema,[]) 
  })
  while(postGraphileSchema==null) require('deasync').sleep(1000)
  return postGraphileSchema
}

let baseSchema = makeSchema()
export default baseSchema

export const makeRemoteSchema = ({ graphqlRoute = '/postgraphile', transforms = [] }:makeSchemaInput) => {
  console.log(app.get('port'), graphqlRoute)
  const httpLink = new HttpLink({ 
    uri: `http://localhost:${APOLLO_ENGINE_PORT}${graphqlRoute}`, 
    fetch : (url:any,params:any)=>{
      console.log(url, params)
      return fetch(url,params)
    } 
  });
  
  const link = setContext((request:any, prevContext:any)=>{
    return prevContext
  }).concat(httpLink)

  const pgSchema = transformSchema(makeRemoteExecutableSchema({
    schema: baseSchema,
    link,
  }),defaultTransforms)

  return pgSchema
}
