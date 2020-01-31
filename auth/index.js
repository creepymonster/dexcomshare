const crypto = require('crypto');

exports.getAuth = async (reply, accountName, password, applicationId) => {
  const auth = crypto.randomBytes(16).toString("hex");

  reply
  .code(200)
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(auth);
};
