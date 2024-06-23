import Fastify from 'fastify';
import authRoutes from './routes/auth.routes.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(authRoutes);

try {
  fastify.listen({ port: 3001, host: '0.0.0.0' });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
