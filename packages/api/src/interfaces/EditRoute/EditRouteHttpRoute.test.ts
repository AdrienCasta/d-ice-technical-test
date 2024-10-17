import EditRouteController from './EditRouteController';
import fastify, { FastifyInstance } from 'fastify';
import editRouteHttpRoute from './EditRouteHttpRoute';
import InMemoryRouteRepository from '../../../dist/infra/repositories/InMemoryRouteRepository';
import { EditRoute } from '../../application/usecases';
import { Route, Waypoint } from '../../domain/entities';

describe('EditRouteHttpRoute', () => {
  let server: FastifyInstance;
  let routeRepository: InMemoryRouteRepository;
  let dieppeLeHavreRoute: Route;

  beforeEach(() => {
    server = fastify();
    routeRepository = new InMemoryRouteRepository();
    dieppeLeHavreRoute = Route.create('Dieppe - Le Havre', [
      Waypoint.create(49.9794, 1.124),
      Waypoint.create(49.9794, 1.124),
    ]).value as Route;
    routeRepository.add(dieppeLeHavreRoute);

    const editRouteController = new EditRouteController(
      new EditRoute(routeRepository)
    );
    editRouteHttpRoute(server, editRouteController);
  });

  it('should edit a route', async () => {
    const response = await server.inject({
      method: 'PUT',
      url: '/routes',
      payload: {
        id: dieppeLeHavreRoute.id,
        name: 'Dieppe - Le Havre - Fos sur mer',
        waypoints: [
          { latitude: 49.9794, longitude: 1.124 },
          { latitude: 43.123, longitude: 5.432 },
          { latitude: 43.123, longitude: 5.432 },
        ],
      },
    });

    expect(response.statusCode).toBe(201);
    const updatedRoute = await routeRepository.getById(dieppeLeHavreRoute.id);
    expect(updatedRoute?.name).toBe('Dieppe - Le Havre - Fos sur mer');
    expect(updatedRoute?.waypoints).toHaveLength(3);
  });

  it('should return 500 if the route does not exist', async () => {
    const response = await server.inject({
      method: 'PUT',
      url: '/routes',
      payload: {
        id: 'non-existent-id',
        name: 'Route 1',
        waypoints: [
          { latitude: 10.6, longitude: 12.6 },
          { latitude: 10.6, longitude: 12.6 },
        ],
      },
    });

    expect(response.statusCode).toBe(500);
  });

  it('should return 400 if the route does not have a name', async () => {
    const response = await server.inject({
      method: 'PUT',
      url: '/routes',
      payload: {
        id: dieppeLeHavreRoute.id,
        name: '',
        waypoints: [
          { latitude: 10.6, longitude: 12.6 },
          { latitude: 10.6, longitude: 12.6 },
        ],
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 if the route does enough waypoints', async () => {
    const response = await server.inject({
      method: 'PUT',
      url: '/routes',
      payload: {
        id: dieppeLeHavreRoute.id,
        name: 'Diepper le Havre',
        waypoints: [{ latitude: 10.6, longitude: 12.6 }],
      },
    });

    expect(response.statusCode).toBe(400);
  });
});
