import RemoveRouteController from './RemoveRouteController';
import fastify, { FastifyInstance } from 'fastify';
import removeRouteHttpRoute from './RemoveRouteHttpRoute';
import InMemoryRouteRepository from '../../infra/repositories/InMemoryRouteRepository';
import { RemoveRoute } from '../../application/usecases';
import { Route, Waypoint } from '../../domain/entities';

describe('RemoveRouteHttpRoute', () => {
  let server: FastifyInstance;
  let routeRepository: InMemoryRouteRepository;
  let existingRoute: Route;

  beforeEach(() => {
    server = fastify();
    routeRepository = new InMemoryRouteRepository();
    existingRoute = Route.create('Existing Route', [
      Waypoint.create(49.9794, 1.124),
      Waypoint.create(49.9794, 1.124),
    ]).value as Route;
    routeRepository.add(existingRoute);

    const removeRouteController = new RemoveRouteController(
      new RemoveRoute(routeRepository)
    );
    removeRouteHttpRoute(server, removeRouteController);
  });

  it('should remove a route', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: `/routes/${existingRoute.id}`,
    });

    expect(response.statusCode).toBe(204);
    const removedRoute = await routeRepository.getById(existingRoute.id);
    expect(removedRoute).toBeNull();
  });
});
