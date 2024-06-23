import { getAuth, postSignup, postLogin } from '../controllers/auth.controller.js';

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

const signupOpts = {
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
  handler: postSignup,
};

const loginOpts = {
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
  handler: postLogin,
};

const authRoutes = async (fastify, options) => {
  fastify.get('/auth', authOpts);
  fastify.post('/auth/signup', signupOpts);
  fastify.post('/auth/login', loginOpts);
};

export default authRoutes;
