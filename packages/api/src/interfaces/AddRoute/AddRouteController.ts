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
    const { data, error } = validateAddRouteBody(request.body);

    if (error) {
      return reply.status(400).send({ message: error.message });
    }

    try {
      const route = Route.create(
        data.name,
        data.waypoints.map((waypoint) =>
          Waypoint.create(waypoint.latitude, waypoint.longitude)
        )
      );
      await this.addRoute.execute(route);

      return reply.status(201).send(route);
    } catch (error) {
      return reply.status(500).send({ message: (error as Error).message });
    }
  }
}

interface RouteDto {
  id: string;
  name: string;
  waypoints: {
    latitude: number;
    longitude: number;
  }[];
}
const routeToDto = (route: Route): RouteDto => {
  return {
    id: route.id,
    name: route.name,
    waypoints: route.waypoints.map((waypoint) => ({
      latitude: waypoint.latitude,
      longitude: waypoint.longitude,
    })),
  };
};
