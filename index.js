const fastify = require('fastify')()
const createTimeSeries = require('@axel92/time-series')

fastify.register(require('fastify-mongodb'), {
  url: 'mongodb://localhost:27017/timeseries'
})

fastify.post('/datapoints', async (request, reply) => {
  const { db } = fastify.mongo
  const timeSeries = createTimeSeries(db)
  const payload = request.body
  const code = await timeSeries.addDataPoint(payload.data, payload.instant)
  reply.send({ code })
})

fastify.get('/datapoints/:code', async (request, reply) => {
  const { db } = fastify.mongo
  const timeSeries = createTimeSeries(db)
  const res = await timeSeries.fetchDataPoint(request.params.code)

  reply.send(res)
})

function start (opts, callback) {
  fastify.listen(3000, (err) => {
    callback(err, fastify)
  })
}

module.exports = { start, fastify }
