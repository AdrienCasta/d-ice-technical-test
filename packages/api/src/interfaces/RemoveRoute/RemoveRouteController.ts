import { FastifyReply, FastifyRequest } from 'fastify';
import RemoveRoute from '../../application/usecases/RemoveRoute/RemoveRoute';
import {
  type RemoveRouteParams,
  validateRemoveRouteParams,
} from './RemoveRouteParams';

export default class RemoveRouteController {
  constructor(private readonly removeRoute: RemoveRoute) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const removeRouteParams = request.params as RemoveRouteParams;
    const validation = validateRemoveRouteParams(removeRouteParams);
    if (!validation.success) {
      return reply.status(400).send({ message: validation.error.message });
    }
    try {
      await this.removeRoute.execute(removeRouteParams.id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ message: (error as Error).message });
    }
  }
}
