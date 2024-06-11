var redis = require('redis')
var promise = require('bluebird')

const REDIS_URL = process.env.REDIS_URL

promise.promisifyAll(redis.RedisClient.prototype)
promise.promisifyAll(redis.Multi.prototype)

var client = () => {
  return new Promise((resolve, reject) => {
    let connector = redis.createClient(REDIS_URL, {
      retry_strategy: function(options) {
        if (options && options.error && options.error.code === 'ECONNREFUSED') {
          // This will suppress the ECONNREFUSED unhandled exception
          // that results in app crash
          return
        }
      }
    })

    connector.on('error', () => {
      // reject("Redis Connection failed");
    })

    connector.on('connect', () => {
      resolve(connector)
    })
  })
}
module.exports = {
  client
}
