import { FastifyInstance } from 'fastify';
import { EditRouteBody } from './EditRouteBody';
import EditRouteController from './EditRouteController';

export default function editRouteHttpRoute(
  fastify: FastifyInstance,
  editRouteController: EditRouteController
) {
  fastify.put<{
    Body: EditRouteBody;
  }>('/routes', async (request, reply) => {
    try {
      await editRouteController.handle(request.body);

      return reply.status(201).send();
    } catch (error) {
      return reply.status(500).send({ message: 'Erreur' });
    }
  });
}
