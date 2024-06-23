async function getAuth(req, reply, fastify) {
  reply.send({ message: `Hello from api-auth` });
}

export default getAuth;
