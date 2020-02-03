const crypto = require('crypto');

exports.getAuth = async (fastify, reply, accountName, password, applicationId) => {
  const API_USER = process.env.API_USER || 'User';
  const API_PWD = process.env.API_PWD || '0001';

  if (accountName === API_USER && password === API_PWD) {
    const auth = crypto.randomBytes(16).toString("hex");

    fastify.level.put('AUTH_KEY', auth, (err) => {
      reply.code(200);
      reply.header('Content-Type', 'application/json; charset=utf-8');
      reply.send(auth);
    });
  } else {
    reply.code(401);
    reply.send({ was: 'unauthorized' });
  }
};
