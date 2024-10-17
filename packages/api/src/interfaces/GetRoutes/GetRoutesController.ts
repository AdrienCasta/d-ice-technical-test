import { FastifyReply, FastifyRequest } from 'fastify';
import GetRoutes from '../../application/usecases/GetRoutes/GetRoutes';
import { Route } from '../../domain/entities';

export default class GetRoutesController {
  constructor(private readonly getRoutes: GetRoutes) {}

  async handle(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Route[]> {
    try {
      const routes = await this.getRoutes.execute();
      return reply.status(200).send(routes);
    } catch (error) {
      return reply.status(500).send({ message: (error as Error).message });
    }
  }
}
