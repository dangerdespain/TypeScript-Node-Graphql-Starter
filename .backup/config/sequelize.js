'use strict'

module.exports = {

  defaults : {
    sequelize: () => ({
      database:  process.env.DEV_POSTGRES_DB || 'localfluence_dev',
      host:      process.env.DEV_POSTGRES_HOST || 'localhost',
      username : process.env.DEV_POSTGRES_USER || 'postgres',
      user :     process.env.DEV_POSTGRES_USER || 'postgres',
      password : process.env.DEV_POSTGRES_PASSWORD,
      port:      process.env.DEV_POSTGRES_PORT || 5432,
      dialect: 'postgres',
      pool: {
        max: 10,
        min: 4,
        acquire: 30000,
        idle: 10000,
        evict : 5000,
      },
      logging : false,
      operatorsAliases: true,
      autoMigrate : false,
    })
  },

  test : {
    sequelize: () => {
      return  {
        database:  process.env.TEST_POSTGRES_DB || 'localfluence_test',
        host:      process.env.TEST_POSTGRES_HOST || 'postgres',
        username : process.env.TEST_POSTGRES_USER || 'postgres',
        user :     process.env.TEST_POSTGRES_USER || 'postgres',
        password : process.env.TEST_POSTGRES_PASSWORD,
        port:      process.env.TEST_POSTGRES_PORT || 5431,
        pool: {
          max: 25,
          min: 1,
          acquire: 10000,
          idle: 10000,
          evict : 5000,
          ssl : true,
        },
      }
    }
  },

  production : {
    sequelize: () => ({
      database:  process.env.PROD_POSTGRES_DB || 'postgres',
      host:      process.env.PROD_POSTGRES_HOST || '0.0.0.0',
      username : process.env.PROD_POSTGRES_USER,
      user :     process.env.PROD_POSTGRES_USER,
      password : process.env.PROD_POSTGRES_PASSWORD,
      port:      process.env.PROD_POSTGRES_PORT || 5432,
      pool: {
        max: 25,
        min: 1,
        acquire: 10000,
        idle: 10000,
        evict : 5000,
        ssl : true,
      },
      // ssl : true,
      logging : false,
    })
  },

  staging : {
    sequelize: () => ({
      database:  process.env.STAGING_POSTGRES_DB || 'localfluence_staging',
      host:      process.env.STAGING_POSTGRES_HOST || '0.0.0.0',
      username : process.env.STAGING_POSTGRES_USER,
      user :     process.env.STAGING_POSTGRES_USER,
      password : process.env.STAGING_POSTGRES_PASSWORD,
      port:      process.env.STAGING_POSTGRES_PORT || 5432,
      dialect: 'postgres',
      // modelPaths : ['src/sequelize/**/index.ts'],
      pool: {
        max: 25,
        min: 1,
        acquire: 10000,
        idle: 10000,
        evict : 5000,
        ssl : true,
      },
      // ssl : true,
      logging : false,
    })
  }
}
