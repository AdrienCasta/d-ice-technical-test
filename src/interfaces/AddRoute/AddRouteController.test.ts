import { fastify } from 'fastify';
import AddRouteController from './AddRouteController';
import InMemoryRouteRepository from '../../infra/repositories/InMemoryRouteRepository';
import RouteRepository from '../../domain/repositories/RouteRepository';
import addRouteHttpRoute from './AddRouteHttpRoute';
import AddRoute from '../../application/usecases/AddRoute/AddRoute';

describe('AddRouteHttpRoute', () => {
  it('should be able to add a route', async () => {
    const routeRepository = new InMemoryRouteRepository();
    const server = buildServer(routeRepository);

    const response = await server.inject({
      method: 'POST',
      url: '/routes',
      payload: {
        name: 'New Route',
        waypoints: [
          { latitude: 1, longitude: 1 },
          { latitude: 2, longitude: 2 },
        ],
      },
    });

    expect(response.statusCode).toBe(201);
    const addedRoute = await routeRepository.getAll();
    expect(addedRoute).toHaveLength(1);
    expect(addedRoute[0]).toEqual(
      expect.objectContaining({
        name: 'New Route',
        waypoints: [
          expect.objectContaining({ latitude: 1, longitude: 1 }),
          expect.objectContaining({ latitude: 2, longitude: 2 }),
        ],
      })
    );
  });
});

function buildServer(routeRepository: RouteRepository) {
  const server = fastify();

  server.register((fastify) =>
    addRouteHttpRoute(
      fastify,
      new AddRouteController(new AddRoute(routeRepository))
    )
  );

  return server;
}
