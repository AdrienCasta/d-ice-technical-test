import { Route, Waypoint } from '@domain/entities';
import { InMemoryRouteRepository } from '@infra/repositories';
import EditRoute from './EditRoute';

describe('EditRoute', () => {
  it('can add a new waypoint to a route', async () => {
    const routeRepository = new InMemoryRouteRepository();
    const editRoute = new EditRoute(routeRepository);
    const leHavreDieppeRoute = Route.create('Le Havre - Dieppe', [
      Waypoint.create(49.4935, -0.1574),
      Waypoint.create(50.0, 1.8),
    ]).value as Route;

    routeRepository.add(leHavreDieppeRoute);

    const fosSurMerWaypoint = Waypoint.create(49.9923, 1.8562);

    const leHavreDieppeFosSurMerRoute =
      leHavreDieppeRoute.addWaypoint(fosSurMerWaypoint);

    await editRoute.execute(leHavreDieppeFosSurMerRoute);

    expect(routeRepository.getById(leHavreDieppeRoute.id)).toEqual(
      leHavreDieppeFosSurMerRoute.value
    );
  });
});
