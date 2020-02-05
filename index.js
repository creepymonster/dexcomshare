const IS_LOCAL = !process.env.PORT;
const PORT = process.env.PORT || 5000;
const ADDRESS = IS_LOCAL ? '127.0.0.1' : '0.0.0.0';

console.log('init..');
console.log(`init environment variable is_local: ${IS_LOCAL}`);
console.log(`init environment variable address: ${ADDRESS}:${PORT}`);

if (IS_LOCAL) {
  const dotenv = require('dotenv');
  dotenv.config();
}

// init fastify
console.log('init fastify');
const fastify = require('fastify')({
  logger: IS_LOCAL
});

// register leveldb plugin
console.log('init fastify-leveldb');
fastify.register(require('fastify-leveldb'), {
  options: {
    store: require('memdown')
  }
}, (err) => {
  if (err) {
    throw err;
  }
});

// fix empty body bug
console.log('init fixes');
fastify.addContentTypeParser('application/json', function (req, done) {
  var data = '';
  req.on('data', chunk => { data += chunk });
  req.on('end', () => {
    done(null, data)
  });
});

// declare routes
console.log('init routes');
fastify.register(require('./auth'));
fastify.register(require('./data'));

// run the server!
const start = async () => {
  try {
    await fastify.listen(PORT, ADDRESS);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

console.log('start fastify..');
start();
