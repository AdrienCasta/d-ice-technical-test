import { FastifyInstance } from 'fastify';
import GetRoutesController from './GetRoutesController';

export default function getRoutesHttpRoute(
  fastify: FastifyInstance,
  getRoutesController: GetRoutesController
) {
  fastify.get('/routes', (request, reply) =>
    getRoutesController.handle(request, reply)
  );
}
