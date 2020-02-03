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

fastify.addContentTypeParser('application/json', function (req, done) { 
  var data = '';
  req.on('data', chunk => { data += chunk });
  req.on('end', () => { 
    done(null, data) 
  });
});

// declare auth route
fastify.get('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (req, reply) => await authModule.getAuth(reply, helpModule.readParam(req, 'accountName'), helpModule.readParam(req, 'password'), helpModule.readParam(req, 'applicationId')));
fastify.post('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (req, reply) => await authModule.getAuth(reply, helpModule.readParam(req, 'accountName'), helpModule.readParam(req, 'password'), helpModule.readParam(req, 'applicationId')));

// declare data route
fastify.get('/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues', async (req, reply) => await dataModule.getData(reply, NS_ADDRESS, NS_API_HASH, helpModule.readParam(req, 'sessionId'), helpModule.readParam(req, 'maxCount')));
fastify.post('/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues', async (req, reply) => await dataModule.getData(reply, NS_ADDRESS, NS_API_HASH, helpModule.readParam(req, 'sessionId'), helpModule.readParam(req, 'maxCount')));

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