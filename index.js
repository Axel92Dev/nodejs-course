const fastify = require('fastify')()

fastify.get('/datapoint', (request, reply) => {
  reply.send({ hello: 'world' })
})

function start (opts, callback) {
  fastify.listen(3000, (err) => {
    callback(err, fastify)
  })
}

module.exports = { start, fastify }
