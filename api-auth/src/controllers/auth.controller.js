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
  } catch (error) {}
  reply.status(400).send({ error: 'Failed to login' });
}

export { getAuth, postSignup, postLogin };
