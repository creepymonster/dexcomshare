const authModule = require('./auth');
const dataModule = require('./data');
const helpModule = require('./help');

const IS_LOCAL = !process.env.PORT;
const PORT = process.env.PORT || 5000;
const ADDRESS = IS_LOCAL ? '127.0.0.1' : '0.0.0.0';

if (IS_LOCAL) {
  const dotenv = require('dotenv');
  dotenv.config();
}

const NS_API_HASH = process.env.NS_API_HASH || '';
const NS_ADDRESS = helpModule.readNSAddress(process.env.NS_ADDRESS || '');

const fastify = require('fastify')({
  logger: IS_LOCAL
});

fastify.register(require('fastify-formbody'));

const getInput = (req, key) => {
  if (req.query && req.query[key] != null) {
    return req.query[key];
  }

  if (req.params && req.params[key] != null) {
    req.params[key];
  }

  if (req.body && req.body[key] != null) {
    return req.body[key];
  }
};

// declare auth route
fastify.get('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (req, reply) => await authModule.getAuth(reply, getInput(req, 'accountName'), getInput(req, 'password'), getInput(req, 'applicationId')));
fastify.post('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (req, reply) => await authModule.getAuth(reply, getInput(req, 'accountName'), getInput(req, 'password'), getInput(req, 'applicationId')));

// declare data route
fastify.get('/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues', async (req, reply) => await dataModule.getData(reply, NS_ADDRESS, NS_API_HASH, getInput(req, 'sessionId'), getInput(req, 'maxCount')));
fastify.post('/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues', async (req, reply) => await dataModule.getData(reply, NS_ADDRESS, NS_API_HASH, getInput(req, 'sessionId'), getInput(req, 'maxCount')));

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