'use strict'

module.exports = {

  defaults : {
    redis: (api) => ({
      connection : {
        prefix : '$development:',
        host : 'localhost',
        port : 6379,
        db : 0,
        retry_strategy: options => {
          return Math.max(options.attempt * 100, 3000);
        }
      }
    })
  },

  test : {
    redis: (api) => ({
      connection : {
        host : 'redis',
        prefix : '$test:',
        host : process.env.TEST_REDIS_HOST || '0.0.0.0',
      }
    })
  },

  production : {
    redis: (api) => ({
      connection : {
        host : 'redis',
        prefix : '$production:',
        host : process.env.REDIS_HOST || '10.7.241.32',
      }
    })
  },

  staging : {
    redis: (api) => ({
      connection : {
        host : 'redis',
        prefix : '$staging:',
        host : process.env.REDIS_HOST || '10.7.241.32',
      }
    })
  }

}