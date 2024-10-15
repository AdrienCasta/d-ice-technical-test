import { Route, Waypoint } from '@domain/entities';
import AddRoute from './AddRoute';
import { InMemoryRouteRepository } from '@infra/repositories';

describe('adding a route', () => {
  it('knows to add a valid route', () => {
    const route = new Route('Brest-Saint-Nazaire', [
      new Waypoint(48.3906, -4.486),
      new Waypoint(47.268, -2.778),
    ]);

    const routeRepository = new InMemoryRouteRepository();
    const addRoute = new AddRoute(routeRepository);

    addRoute.execute(route);

    expect(routeRepository.getByName(route.name)).toEqual(route);
  });
});
