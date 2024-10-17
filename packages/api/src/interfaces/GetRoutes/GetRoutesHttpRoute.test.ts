import GetRoutesController from './GetRoutesController';
import fastify, { FastifyInstance } from 'fastify';
import getRoutesHttpRoute from './GetRoutesHttpRoute';
import { GetRoutes } from '../../application/usecases';
import { InMemoryRouteRepository } from '../../infra/repositories';
import { Route, Waypoint } from '../../domain/entities';

describe('GetRoutesHttpRoute', () => {
  let server: FastifyInstance;
  let routeRepository: InMemoryRouteRepository;

  beforeEach(async () => {
    server = fastify();
    routeRepository = new InMemoryRouteRepository();

    const getRoutesController = new GetRoutesController(
      new GetRoutes(routeRepository)
    );
    getRoutesHttpRoute(server, getRoutesController);
  });

  it('should get all routes', async () => {
    await routeRepository.add(
      Route.create('Dieppe - Le Havre', [
        Waypoint.create(49.9794, 1.124),
        Waypoint.create(49.4944, 0.1079),
      ]).value as Route
    );
    await routeRepository.add(
      Route.create('Paris - Lyon', [
        Waypoint.create(48.8566, 2.3522),
        Waypoint.create(45.764, 4.8357),
      ]).value as Route
    );
    const response = await server.inject({
      method: 'GET',
      url: '/routes',
    });

    expect(response.statusCode).toBe(200);
    const routes = JSON.parse(response.payload);
    expect(routes).toHaveLength(2);
    expect(routes[0].name).toBe('Dieppe - Le Havre');
    expect(routes[1].name).toBe('Paris - Lyon');
  });

  it('should return an empty array when there are no routes', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/routes',
    });

    expect(response.statusCode).toBe(200);
    const routes = JSON.parse(response.payload);
    expect(routes).toHaveLength(0);
  });
});
