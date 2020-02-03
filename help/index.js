exports.readNSAddress = function(address) {
  return address.replace(/\/$/, "");
};

exports.readParam = function(req, key) {
  if (req.body && req.body !== '') {
    console.log('BODY', req.body);

    const parsedBody = JSON.parse(req.body);
    if (parsedBody) {
      return parsedBody[key];
    }
  }

  if (req.params && req.params[key] != null) {
    console.log('PARAMS', JSON.stringify(req.params));

    return req.params[key];
  }

  if (req.query && req.query[key] != null) {
    console.log('QUERY', JSON.stringify(req.query));

    return req.query[key];
  }
}