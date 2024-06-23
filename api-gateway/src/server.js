import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyHttpProxy from '@fastify/http-proxy';
import { createClient } from '@supabase/supabase-js';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

const getUserByAuthId = async (authId) => {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase.from('user').select('*').eq('auth_id', authId).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

fastify.addHook('onRequest', async (request, reply) => {
  if (request.raw.url.startsWith('/auth')) {
    return;
  } else {
    try {
      let authHeader = request.headers.authorization;

      if (!authHeader) reply.status(401).send({ message: 'Unauthorized' });

      const token = authHeader.split(' ')[1];

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      let { data, error } = await supabase.auth.getUser(token);
      if (error) reply.status(401).send({ message: 'Unauthorized' });

      let authId = data.user.id;
      let user = await getUserByAuthId(authId);
      return;
    } catch (err) {
      reply.status(401).send({ message: 'Unauthorized' });
    }
  }
});

fastify.register(fastifyHttpProxy, {
  upstream: 'http://api-auth:3001',
  prefix: '/auth',
  rewritePrefix: '/auth',
});

fastify.register(fastifyHttpProxy, {
  upstream: 'http://api-auth:3001',
  prefix: '/user',
  rewritePrefix: '/user',
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
