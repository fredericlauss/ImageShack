async function getBusiness(req, reply, fastify) {
  reply.send({ message: `Hello from api-business` });
}

export default getBusiness;
