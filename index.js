const request = require('request');
const crypto = require('crypto');

const IS_LOCAL = !process.env.PORT;
const PORT = process.env.PORT || 5000;
const ADDRESS = IS_LOCAL ? '127.0.0.1' : '0.0.0.0';

const shasum = crypto.createHash('sha1');
shasum.update(process.env.NS_API_SECRET || '');

const NS_API_HASH = shasum.digest('hex');
const NS_ADDRESS = process.env.NS_ADDRESS || '';

const fastify = require('fastify')({
  logger: IS_LOCAL
});

// declare a route
fastify.get('/', async (req, reply) => {
  return {
    address: NS_ADDRESS,
    hash: NS_API_HASH
  }
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