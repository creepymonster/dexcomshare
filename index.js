const IS_LOCAL = !process.env.PORT;
const PORT = process.env.PORT || 5000;
const ADDRESS = IS_LOCAL ? '127.0.0.1' : '0.0.0.0';

const NS_ADDRESS = process.env.NS_ADDRESS || 'none';

const fastify = require('fastify')({
  logger: IS_LOCAL
});

const request = require('request');

// declare a route
fastify.get('/', async (req, reply) => {
  const status = await request.get('https://rm--nightscout.herokuapp.com/api/v1/status');
  return { status: status }
})

// run the server!
const start = async () => {
  try {
    await fastify.listen(PORT, ADDRESS);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();