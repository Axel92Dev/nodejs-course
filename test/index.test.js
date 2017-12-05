const t = require('tap')
const test = t.test
const fastify = require('../index').fastify

test('GET /datapoint', t => {
  t.plan(2)

  fastify.inject(
    {
      method: 'GET',
      url: '/datapoint'
    },
    res => {
      t.strictEqual(res.statusCode, 200)
      t.deepEqual(JSON.parse(res.payload), { hello: 'world' })

      fastify.close()
    }
  )
})
