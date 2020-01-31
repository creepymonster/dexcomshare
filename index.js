const IS_LOCAL = !process.env.PORT;
const PORT = process.env.PORT || 5000;
const ADDRESS = IS_LOCAL ? '127.0.0.1' : '0.0.0.0';

const fastify = require('fastify')({
  logger: IS_LOCAL
});

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
});

fastify.listen(PORT, ADDRESS, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
});
