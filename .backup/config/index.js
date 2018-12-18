require('dotenv').config()

const makeConfig = require('./util/makeConfig')
const { argv } = require('optimist')

const ApiConfig = require('./api')
const ApolloEngineConfig = require('./apolloEngine')
const AppConfig = require('./app')
const AWSConfig = require('./aws')
const ExpressConfig = require('./express')
const GoogleMapsConfig = require('./googleMaps')
const JWTAuthConfig = require('./jwtauth')
const PostgraphileConfig = require('./postgraphile')
const RedisConfig = require('./redis')
const SendgridConfig = require('./sendgrid')
const SequelizeConfig = require('./sequelize')
const SlackConfig = require('./slack')
const StripeConfig = require('./stripe')
const TwilioConfig = require('./twilio')

const configFiles = [
  ApiConfig,
  ApolloEngineConfig,
  AppConfig,
  AWSConfig,
  ExpressConfig,
  GoogleMapsConfig,
  JWTAuthConfig,
  PostgraphileConfig,
  RedisConfig,
  SendgridConfig,
  SequelizeConfig,
  SlackConfig,
  StripeConfig,
  TwilioConfig,
]

let env = 'development'

if (argv.NODE_ENV) {
  env = argv.NODE_ENV
} else if (process.env.NODE_ENV) {
  env = process.env.NODE_ENV
}

module.exports = makeConfig(configFiles,env)
