import { FastifyReply, FastifyRequest } from 'fastify';
import AddRoute from '../../application/usecases/AddRoute/AddRoute';
import { Route, Waypoint } from '../../domain/entities';
import { type AddRouteParams, validateAddRouteBody } from './AddRouteBody';

export default class AddRouteController {
  constructor(private readonly addRoute: AddRoute) {}

  async handle(
    request: FastifyRequest<{ Body: AddRouteParams }>,
    reply: FastifyReply
  ) {
    const { data: route, error } = validateAddRouteBody(request.body);

    if (error) {
      return reply.status(400).send({ message: error.message });
    }

    try {
      await this.addRoute.execute(
        Route.create(
          route.name,
          route.waypoints.map((waypoint) =>
            Waypoint.create(waypoint.latitude, waypoint.longitude)
          )
        )
      );
      return reply.status(201).send();
    } catch (error) {
      return reply.status(500).send({ message: (error as Error).message });
    }
  }
}
