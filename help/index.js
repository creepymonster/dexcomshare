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

exports.readNSAddress = (address) => {
  return address.replace(/\/$/, "");
};

exports.readParam = (request, key) => {
  if (request.body && request.body !== '') {
    const parsedBody = JSON.parse(request.body);
    if (parsedBody) {
      return parsedBody[key];
    }
  }

  if (request.params && request.params[key] != null) {
    return request.params[key];
  }

  if (request.query && request.query[key] != null) {
    return request.query[key];
  }
}

exports.convertToTrend = (direction) => {
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
};

exports.convertDate = (dateString) => {
  const date = new Date(dateString);

  return `/Date(${date.getTime()})/`;
};
