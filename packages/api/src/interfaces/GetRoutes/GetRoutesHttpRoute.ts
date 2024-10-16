import { FastifyInstance } from 'fastify';
import GetRoutesController from './GetRoutesController';

export default function getRoutesHttpRoute(
  fastify: FastifyInstance,
  getRoutesController: GetRoutesController
) {
  fastify.get('/routes', async (request, reply) => {
    try {
      const routes = await getRoutesController.handle();

      return reply.status(200).send(routes);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: 'Erreur' });
    }
  });
}
