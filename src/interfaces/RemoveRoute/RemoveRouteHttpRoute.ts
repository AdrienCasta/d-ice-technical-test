import { FastifyInstance } from 'fastify';
import { RemoveRouteParams } from './RemoveRouteParams';
import RemoveRouteController from './RemoveRouteController';

export default function removeRouteHttpRoute(
  fastify: FastifyInstance,
  removeRouteController: RemoveRouteController
) {
  fastify.delete<{
    Params: RemoveRouteParams;
  }>('/routes/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      await removeRouteController.handle({ id });

      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ message: 'Erreur' });
    }
  });
}
