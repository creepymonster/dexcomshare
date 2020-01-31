const authModule = require('./auth');
const dataModule = require('./data');
const helpModule = require('./help');

const IS_LOCAL = !process.env.PORT;
const PORT = process.env.PORT || 5000;
const ADDRESS = IS_LOCAL ? '127.0.0.1' : '0.0.0.0';

const NS_API_HASH = process.env.NS_API_HASH || '';
const NS_ADDRESS = helpModule.readNSAddress(process.env.NS_ADDRESS || '');

const fastify = require('fastify')({
  logger: IS_LOCAL
});

// declare auth route
fastify.get('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (req, reply) => authModule.getAuth(reply, req.query.accountName, req.query.password, req.query.applicationId));
fastify.post('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (req, reply) => authModule.getAuth(reply, req.body.accountName, req.body.password, req.body.applicationId));

// declare data route
fastify.get('/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues', async (req, reply) => dataModule.getData(reply, NS_ADDRESS, NS_API_HASH, req.query.sessionId, req.query.minutes, req.query.maxCount));
fastify.post('/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues', async (req, reply) => dataModule.getData(reply, NS_ADDRESS, NS_API_HASH, req.body.sessionId, req.body.minutes, req.body.maxCount));

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