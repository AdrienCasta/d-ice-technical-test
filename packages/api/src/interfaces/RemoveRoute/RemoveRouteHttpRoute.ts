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
    await removeRouteController.handle(request, reply);
  });
}
