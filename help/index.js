exports.readNSAddress = function(address) {
  return address.replace(/\/$/, "");
};

exports.readParam = function(req, key) {
  if (req.body && req.body !== '') {
    const parsedBody = JSON.parse(req.body);
    if (parsedBody) {
      return parsedBody[key];
    }
  }

  if (req.params && req.params[key] != null) {
    return req.params[key];
  }

  if (req.query && req.query[key] != null) {
    return req.query[key];
  }
}