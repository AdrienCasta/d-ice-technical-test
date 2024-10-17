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
    await editRouteController.handle(request, reply);
  });
}
