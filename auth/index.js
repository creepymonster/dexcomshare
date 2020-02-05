const crypto = require('crypto');
const help = require('./../help');

async function auth (fastify, request, reply) {
  return new Promise((resolve, reject) => {
    const API_USER = process.env.API_USER || 'User';
    const API_PWD = process.env.API_PWD || '0001';

    const accountName = help.readParam(request, 'accountName');
    const password = help.readParam(request, 'password');

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
}

async function routes (fastify, options) {
  fastify.get('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (request, reply) => auth(fastify, request, reply));
  fastify.post('/ShareWebServices/Services/General/LoginPublisherAccountByName', async (request, reply) => auth(fastify, request, reply));
}

module.exports = routes