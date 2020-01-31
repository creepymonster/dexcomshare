const path = require('path');
const fastify = require('fastify')({
  logger: true
});

const PORT = process.env.PORT || 5000;

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
});

// Run the server!
fastify.listen(PORT, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
