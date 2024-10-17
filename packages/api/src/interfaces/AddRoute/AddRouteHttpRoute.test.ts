import AddRouteController from './AddRouteController';
import fastify, { FastifyInstance } from 'fastify';
import addRouteHttpRoute from './AddRouteHttpRoute';
import { AddRoute } from '../../application/usecases';
import { InMemoryRouteRepository } from '../../infra/repositories';

describe('AddRouteHttpRoute', () => {
  let server: FastifyInstance;
  let routeRepository: InMemoryRouteRepository;

  beforeEach(() => {
    server = fastify();
    routeRepository = new InMemoryRouteRepository();

    const addRouteController = new AddRouteController(
      new AddRoute(routeRepository)
    );
    addRouteHttpRoute(server, addRouteController);
  });

  it('should add a new route', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/routes',
      payload: {
        name: 'Dieppe - Le Havre',
        waypoints: [
          { latitude: 49.9794, longitude: 1.124 },
          { latitude: 49.4944, longitude: 0.1079 },
        ],
      },
    });

    expect(response.statusCode).toBe(201);
    const responseBody = JSON.parse(response.payload);
    expect(responseBody.value).toEqual(routeRepository.routes[0]);
  });

  it('should return 400 if the route does not have a name', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/routes',
      payload: {
        name: '',
        waypoints: [
          { latitude: 49.9794, longitude: 1.124 },
          { latitude: 49.4944, longitude: 0.1079 },
        ],
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 if the route does not have enough waypoints', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/routes',
      payload: {
        name: 'Dieppe - Le Havre',
        waypoints: [{ latitude: 49.9794, longitude: 1.124 }],
      },
    });

    expect(response.statusCode).toBe(400);
  });
});
