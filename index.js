const authModule = require('./auth');
const dataModule = require('./data');
const helpModule = require('./help');

const IS_LOCAL = !process.env.PORT;
const PORT = process.env.PORT || 5000;
const ADDRESS = IS_LOCAL ? '127.0.0.1' : '0.0.0.0';

console.log('INIT..');
console.log(`INIT, IS_LOCAL ${IS_LOCAL}`);
console.log(`INIT, ADDRESS ${ADDRESS}:${PORT}`);

if (IS_LOCAL) {
  const dotenv = require('dotenv');
  dotenv.config();
}

// init fastify
console.log('INIT, fastify');
const fastify = require('fastify')({
  logger: IS_LOCAL
});

// register leveldb plugin
console.log('INIT, fastify-leveldb');
fastify.register(require('fastify-leveldb'), {
  options: {
    store: require('memdown')
  }
}, err => {
  if (err) {
    throw err;
  }
});

// fix empty body bug
console.log('INIT, fix json empty body bug');
fastify.addContentTypeParser('application/json', function (req, done) {
  var data = '';
  req.on('data', chunk => { data += chunk });
  req.on('end', () => {
    done(null, data)
  });
});

// declare auth route
console.log('INIT, register GET(/ShareWebServices/Services/General/LoginPublisherAccountByName)');
fastify.get('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (req, reply) => {
  return await authModule.getAuth(fastify, reply, helpModule.readParam(req, 'accountName'), helpModule.readParam(req, 'password'), helpModule.readParam(req, 'applicationId'));
});

console.log('INIT, register POST(/ShareWebServices/Services/General/LoginPublisherAccountByName)');
fastify.post('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (req, reply) => {
  return await authModule.getAuth(fastify, reply, helpModule.readParam(req, 'accountName'), helpModule.readParam(req, 'password'), helpModule.readParam(req, 'applicationId'))
});

// declare data route
console.log('INIT, register GET(/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues)');
fastify.get('/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues', async (req, reply) => {
  return await dataModule.getData(fastify, reply, helpModule.readParam(req, 'sessionId'), helpModule.readParam(req, 'maxCount'))
});

console.log('INIT, register POST(/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues)');
fastify.post('/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues', async (req, reply) => {
  return await dataModule.getData(fastify, reply, helpModule.readParam(req, 'sessionId'), helpModule.readParam(req, 'maxCount'))
});

console.log('INIT, done');

// run the server!
const start = async () => {
  try {
    await fastify.listen(PORT, ADDRESS);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

console.log('START..');
start();
