const path = require('path');
const fastify = require('fastify')({
  logger: true
});

const PORT = process.env.PORT || 5000;

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
});

let address = '127.0.0.1';
if (PORT !== 5000) {
  address = '0.0.0.0';
}

fastify.listen(PORT, address, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
});
