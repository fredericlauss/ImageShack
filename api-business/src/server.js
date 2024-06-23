import Fastify from 'fastify';
import businessRoutes from './routes/business.routes.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(businessRoutes);

try {
  fastify.listen({ port: 3002, host: '0.0.0.0' });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
