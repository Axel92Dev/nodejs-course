'use strict'
const t = require('tap')
const test = t.test
const { start } = require('../index')

test('GET /datapoint/:id returns a single data point', async t => {
  t.plan(2)

  const { fastify } = start()

  const payload = {
    data: 'ciao',
    instant: new Date().getTime()
  }

  const postRes = await fastify.inject({
    method: 'POST',
    url: '/datapoints',
    payload
  })

  const code = JSON.parse(postRes.payload).code

  const expectePayload = Object.assign({}, payload, { code })

  const res = await fastify.inject({
    method: 'GET',
    url: `/datapoints/${code}`
  })

  t.strictEqual(res.statusCode, 200)
  t.deepEqual(JSON.parse(res.payload), expectePayload)

  fastify.close()
})
