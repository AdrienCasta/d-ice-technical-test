import { FastifyInstance } from 'fastify';
import { AddRouteParams } from './AddRouteBody';
import AddRouteController from './AddRouteController';

export default function addRouteHttpRoute(
  fastify: FastifyInstance,
  addRouteController: AddRouteController
) {
  fastify.post<{
    Body: AddRouteParams;
  }>('/routes', async (request, reply) => {
    await addRouteController.handle(request, reply);
  });
}
