const request = require('request');
const help = require('./../help');

const data = async (fastify, req, reply) => {
  return new Promise((resolve, reject) => {
    const NS_ADDRESS = help.readNSAddress(process.env.NS_ADDRESS || '');
    const NS_API_HASH = process.env.NS_API_HASH || '';

    console.log('data');
    console.log(`data, environment variable ns_address: ${NS_ADDRESS}`);
    console.log(`data, environment variable ns_api_hash: ${NS_API_HASH}`);

    const sessionId = help.readParam(req, 'sessionId');
    const maxCount = Math.min(1440, help.readParam(req, 'maxCount') || 3);

    console.log(`data, input variable sessionId: ${sessionId}`);
    console.log(`data, input variable maxCount: ${maxCount}`);

    const reqOptions = {
      url: `${NS_ADDRESS}/api/v1/entries.json?count=${maxCount}&units=mgdl&find[sgv][$gt]=0`,
      headers: {
        'api-secret': NS_API_HASH,
        'accept': 'application/json'
      }
    };

    const reqCallback = (err, resp, body) => {
      const nsData = JSON.parse(body);
      const dexcomData = [];

      for (let index = 0; index < nsData.length; index++) {
        const nsDataItem = nsData[index];

        dexcomData.push({
          'DT': help.convertDate(nsDataItem.date),
          'ST': help.convertDate(nsDataItem.date),
          'Trend': help.convertToTrend(nsDataItem.direction),
          'Value': nsDataItem.sgv,
          'WT': help.convertDate(nsDataItem.date)
        });
      }

      reply.code(200);
      reply.header('Content-Type', 'application/json; charset=utf-8');
      resolve(dexcomData);
    };

    fastify.level.get(sessionId, (err, value) => {
      if (!err && value && value === 'true') {
        request(reqOptions, reqCallback);
      } else {
        reply.code(401);
        reject(new Error('401 Unauthorized'));
      }
    });
  });
};

const routes = async (fastify, options) => {
  console.log('init, data');

  const ROUTE = '/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues';

  fastify.get(ROUTE, async (request, reply) => data(fastify, request, reply));
  fastify.post(ROUTE, async (request, reply) => data(fastify, request, reply));
};

module.exports = routes