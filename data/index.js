const request = require('request');
const helpModule = require('./../help');

// other constants
const TREND_DOUBLE_UP = 1;
const TREND_SINGLE_UP = 2;
const TREND_UP_45 = 3;
const TREND_FLAT = 4;
const TREND_DOWN_45 = 5;
const TREND_SINGLE_DOWN = 6;
const TREND_DOUBLE_DOWN = 7;
const TREND_NOT_COMPUTABLE = 8;
const TREND_OUT_OF_RANGE = 9;
const TREND_NONE = 0;

const convertDate = (dateString) => {
  const date = new Date(dateString);

  return `/Date(${date.getTime()})/`;
}

const convertToTrend = (direction) => {
  switch (direction) {
    case 'DoubleUp':
      return TREND_DOUBLE_UP;
    case 'SingleUp':
      return TREND_SINGLE_UP;
    case 'FortyFiveUp':
      return TREND_UP_45;
    case 'Flat':
      return TREND_FLAT;
    case 'FortyFiveDown':
      return TREND_DOWN_45;
    case 'SingleDown':
      return TREND_SINGLE_DOWN;
    case 'DoubleDown':
      return TREND_DOUBLE_DOWN;
    case 'NOT COMPUTABLE':
      return TREND_NOT_COMPUTABLE;
    case 'OUT OF RANGE':
      return TREND_OUT_OF_RANGE;
  }

  return TREND_NONE;
}

exports.getData = async (fastify, reply, sessionId, maxCount) => {
  const NS_ADDRESS = helpModule.readNSAddress(process.env.NS_ADDRESS || '');
  const NS_API_HASH = process.env.NS_API_HASH || '';

  console.log('NS_ADDRESS', NS_ADDRESS);
  console.log('NS_API_HASH', NS_API_HASH);

  const count = maxCount || 3;
  const requestOptions = {
    url: `${NS_ADDRESS}/api/v1/entries.json?count=${count}&units=mgdl&find[sgv][$gt]=0`,
    headers: {
      'api-secret': NS_API_HASH,
      'accept': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const requestCallback = (error, response, body) => {
      const nsData = JSON.parse(body);
      const dexcomData = [];

      for (let index = 0; index < nsData.length; index++) {
        const nsDataItem = nsData[index];

        dexcomData.push({
          'DT': convertDate(nsDataItem.date),
          'ST': convertDate(nsDataItem.date),
          'Trend': convertToTrend(nsDataItem.direction),
          'Value': nsDataItem.sgv,
          'WT': convertDate(nsDataItem.date)
        });
      }

      resolve(dexcomData);
    };

    fastify.level.get('AUTH_KEY', (error, value) => {
      console.log(error, value, sessionId);

      if (sessionId !== '' && value === sessionId) {
        request(requestOptions, requestCallback);
      } else {
        resolve([]);
      }
    });
  });
};
