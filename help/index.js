exports.readNSAddress = function(address) {
  return address.replace(/\/$/, "");
};

exports.readParam = function(request, key) {
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