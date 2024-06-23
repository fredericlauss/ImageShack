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
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              aud: { type: 'string' },
              role: { type: 'string' },
              email: { type: 'string' },
              email_confirmed_at: { type: 'string' },
              phone: { type: 'string' },
              confirmation_sent_at: { type: 'string' },
              confirmed_at: { type: 'string' },
              last_sign_in_at: { type: 'string' },
              app_metadata: { type: 'object' },
              user_metadata: { type: 'object' },
              identities: { type: 'array' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              is_anonymous: { type: 'boolean' },
            },
          },
          session: {
            type: 'object',
            properties: {
              access_token: { type: 'string' },
              token_type: { type: 'string' },
              expires_in: { type: 'integer' },
              expires_at: { type: 'integer' },
              refresh_token: { type: 'string' },
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  aud: { type: 'string' },
                  role: { type: 'string' },
                  email: { type: 'string' },
                  email_confirmed_at: { type: 'string' },
                  phone: { type: 'string' },
                  confirmation_sent_at: { type: 'string' },
                  confirmed_at: { type: 'string' },
                  last_sign_in_at: { type: 'string' },
                  app_metadata: { type: 'object' },
                  user_metadata: { type: 'object' },
                  identities: { type: 'array' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' },
                  is_anonymous: { type: 'boolean' },
                },
              },
            },
          },
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
          auth_id: { type: 'string' },
          email: { type: 'string' },
          username: { type: 'string' },
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
