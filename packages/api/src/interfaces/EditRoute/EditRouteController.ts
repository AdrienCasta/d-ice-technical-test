import { validateEditRouteBody } from './EditRouteBody';
import { Route, Waypoint } from '../../domain/entities';
import EditRoute from '../../application/usecases/EditRoute/EditRoute';
import { FastifyReply, FastifyRequest } from 'fastify';
export default class EditRouteController {
  constructor(private readonly editRoute: EditRoute) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const route = validateEditRouteBody(request.body);
    if (!route.success) {
      return reply.status(400).send({ message: route.error.message });
    }

    try {
      await this.editRoute.execute(
        route.data.id,
        Route.create(
          route.data.name,
          route.data.waypoints.map((waypoint) =>
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
