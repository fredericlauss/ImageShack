import { createClient } from '@supabase/supabase-js';

//--------------------------------------------------

const createAuthUser = async (email, password) => {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    return data.user.id;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const createDbUser = async (userData) => {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase.from('user').insert(userData);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const authLogin = async (email, password) => {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

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

const deleteUserByAuthId = async (authId) => {
  if (!authId) throw new Error('Auth ID is required to delete user');

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase.from('user').delete().eq('auth_id', authId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const deleteAuthUser = async (userId) => {
  if (!userId) throw new Error('User ID is required to delete user');

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase.auth.admin.deleteUser(userId);

    if (error) throw error;

    return { message: 'User successfully deleted.' };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

//--------------------------------------------------

async function getAuth(req, reply, fastify) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  reply.send({ message: `Hello from api-auth` });
}

async function postSignup(req, reply, fastify) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  let { email, password } = req.body;
  try {
    let authid = await createAuthUser(email, password);
    await createDbUser({ auth_id: authid, username: email, email });
    reply.send({ message: `Successfully signed up !` });
  } catch (error) {
    console.log(error);
    reply.status(400).send({ error: 'Failed to sign user up' });
  }
}

async function postLogin(req, reply, fastify) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  let { email, password } = req.body;
  try {
    let data = await authLogin(email, password);
    console.log(data);
    reply.send(data);
  } catch (error) {
    reply.status(400).send({ error: 'Failed to login' });
  }
}

async function deleteUser(req, reply, fastify) {
  let authHeader = req.headers.authorization;

  try {
    if (!authHeader) reply.status(401).send({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    let { data, error } = await supabase.auth.getUser(token);
    if (error) reply.status(401).send({ message: 'Unauthorized' });

    let authId = data.user.id;
    await deleteUserByAuthId(authId);

    await deleteAuthUser(authId);

    reply.send({ message: `Successfully deleted user` });
  } catch (error) {
    reply.status(400).send({ error: 'Failed to deleted user' });
  }
}

async function getUser(req, reply, fastify) {
  try {
    let authHeader = req.headers.authorization;

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
    console.log(user);
    reply.send(user);
  } catch (err) {
    reply.status(401).send({ message: 'Unauthorized' });
  }
}

export { getAuth, postSignup, postLogin, deleteUser, getUser };
