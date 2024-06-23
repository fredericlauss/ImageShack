import getBusiness from '../controllers/business.controller.js';

const businessOpts = {
  schema: {
    tags: ['Business'],
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: getBusiness,
};

const businessRoutes = async (fastify, options) => {
  fastify.get('/business', businessOpts);
};

export default businessRoutes;
