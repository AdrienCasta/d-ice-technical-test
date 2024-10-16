import { fastify } from 'fastify';
import GetRoutesController from './GetRoutesController';
import InMemoryRouteRepository from '../../infra/repositories/InMemoryRouteRepository';
import { Route, Waypoint } from '../../domain/entities';
import { RouteRepository } from '../../domain/repositories';
import getRoutesHttpRoute from './GetRoutesHttpRoute';
import GetRoutes from '../../application/usecases/GetRoutes/GetRoutes';

describe('GetRoutesHttpRoute', () => {
  it('should be able to get routes', async () => {
    const routeRepository = new InMemoryRouteRepository();
    await routeRepository.add(rotterdamFosSurMerRoute.value as Route);
    const server = buildServer(routeRepository);

    const response = await server.inject({
      method: 'GET',
      url: '/routes',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: rotterdamFosSurMerRoute.value?.id,
          name: rotterdamFosSurMerRoute.value?.name,
          waypoints: rotterdamFosSurMerRoute.value?.waypoints,
        }),
      ])
    );
  });
});

const rotterdamFosSurMerRoute = Route.create('Rotterdam 🚢 Fos sur Mer', [
  Waypoint.create(1, 1),
  Waypoint.create(2, 2),
]);

function buildServer(routeRepository: RouteRepository) {
  const server = fastify();

  server.register((fastify) =>
    getRoutesHttpRoute(
      fastify,
      new GetRoutesController(new GetRoutes(routeRepository))
    )
  );

  return server;
}
