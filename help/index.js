exports.readNSAddress = function(address) {
  return address.replace(/\/$/, "");
};

exports.readParam = function(req, key) {
  if (req.query && req.query[key] != null) {
    return req.query[key];
  }

  if (req.params && req.params[key] != null) {
    return req.params[key];
  }

  if (req.body && req.body[key] != null) {
    return req.body[key];
  }
}