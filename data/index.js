const request = require('request');

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

exports.getData = async (reply, baseUrl, apiHash, sessionId, minutes, maxCount) => {
  return new Promise((resolve, reject) => {
    const count = maxCount || 3;

    const requestOptions = {
      url: `${baseUrl}/api/v1/entries.json?count=${count}&units=mgdl&find[sgv][$gt]=0`,
      headers: {
        'api-secret': apiHash,
        'accept': 'application/json'
      }
    }

    const requestCallback = (error, response, body) => {
      const nsData = JSON.parse(body);
      const dexcomData = [];

      for (let index = 0; index < nsData.length; index++) {
        const nsDataItem = nsData[index];

        dexcomData.push({
          'DT': 'dt',
          'ST': 'st',
          'WT': 'wt',
          'Value': nsDataItem.sgv,
          'Trend': convertToTrend(nsDataItem.direction)
        });
      }

      resolve(dexcomData);
    };

    request(requestOptions, requestCallback)
  });
};
