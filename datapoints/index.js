const createTimeSeries = require('@axel92/time-series')

module.exports = (fastify, opts, next) => {
  const timeSeries = createTimeSeries(fastify.mongo.db)

  fastify.post('/', async (request, reply) => {
    const payload = request.body
    const code = await timeSeries.addDataPoint(payload.data, payload.instant)
    reply.send({ code })
  })

  fastify.get('/:code', async (request, reply) => {
    const res = await timeSeries.fetchDataPoint(request.params.code)

    reply.send(res)
  })

  next()
}
