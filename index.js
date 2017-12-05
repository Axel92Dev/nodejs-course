'use strict'

function start (opts, callback = () => {}) {
  const fastify = require('fastify')()

  fastify.register(require('fastify-mongodb'), {
    url: 'mongodb://localhost:27017/timeseries'
  })
  fastify.register(require('./datapoints'), { prefix: '/datapoints' })

  fastify.listen(3000, (err) => {
    callback(err, fastify)
  })

  return { fastify }
}

module.exports = { start }
