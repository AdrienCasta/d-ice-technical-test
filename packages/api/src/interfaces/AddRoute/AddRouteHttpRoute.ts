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
    try {
      await addRouteController.handle(request.body);

      return reply.status(201).send({
        message: 'Route added successfully',
        status: 201,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: 'Erreur' });
    }
  });
}
