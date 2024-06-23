import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyHttpProxy from '@fastify/http-proxy';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

fastify.addHook('onRequest', async (request, reply) => {
  if (request.raw.url.startsWith('/auth')) {
    return;
  }
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ message: 'Unauthorized' });
  }
});

fastify.register(fastifyHttpProxy, {
  upstream: 'http://api-auth:3001',
  prefix: '/auth',
  rewritePrefix: '/auth',
});

fastify.register(fastifyHttpProxy, {
  upstream: 'http://api-business:3002',
  prefix: '/business',
  rewritePrefix: '/business',
});

try {
  fastify.listen({ port: 3000, host: '0.0.0.0' });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
