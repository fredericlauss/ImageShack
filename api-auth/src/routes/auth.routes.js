import getAuth from '../controllers/auth.controller.js';

const authOpts = {
  schema: {
    tags: ['Auth'],
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: getAuth,
};

const authRoutes = async (fastify, options) => {
  fastify.get('/auth', authOpts);
};

export default authRoutes;
