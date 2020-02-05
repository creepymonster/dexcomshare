const crypto = require('crypto');
const help = require('./../help');

const auth = async (fastify, request, reply) => {
  return new Promise((resolve, reject) => {
    const API_USER = process.env.API_USER || 'User';
    const API_PWD = process.env.API_PWD || '0001';

    console.log('Request route "auth"');

    const accountName = help.readParam(request, 'accountName');
    const password = help.readParam(request, 'password');

    console.log(`Request route "auth", "accountName: ${accountName}"`);
    console.log(`Request route "auth", "password: ${password}"`);

    if (accountName === API_USER && password === API_PWD) {
      const auth = crypto.randomBytes(16).toString("hex");

      fastify.level.put(auth, true, (err) => {
        if (err) {
          throw err;
        }

        reply.code(200);
        reply.header('Content-Type', 'application/json; charset=utf-8');
        resolve(auth);
      });
    } else {
      reply.code(401);
      reject(new Error('401 Unauthorized'));
    }
  });
};

const routes = async (fastify, options) => {
  console.log('Init route "auth"');
  
  const ROUTE = '/ShareWebServices/Services/General/LoginPublisherAccountByName';

  fastify.get(ROUTE, async (request, reply) => auth(fastify, request, reply));
  fastify.post(ROUTE, async (request, reply) => auth(fastify, request, reply));
};

module.exports = routes