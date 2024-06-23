import {
  getAuth,
  postSignup,
  postLogin,
  deleteUser,
  getUser,
} from '../controllers/auth.controller.js';

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

const deleteOpts = {
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
  handler: deleteUser,
};

const getUserOpts = {
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
  handler: getUser,
};

const authRoutes = async (fastify, options) => {
  fastify.get('/auth', authOpts);
  fastify.post('/auth/signup', signupOpts);
  fastify.post('/auth/login', loginOpts);
  fastify.delete('/user', deleteOpts);
  fastify.get('/user', getUserOpts);
};

export default authRoutes;
