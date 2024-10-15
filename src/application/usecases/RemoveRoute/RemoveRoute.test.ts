import { Route, Waypoint } from '@domain/entities';
import { InMemoryRouteRepository } from '@infra/repositories';
import RemoveRoute from './RemoveRoute';

describe('RemoveRoute', () => {
  let routeRepository: InMemoryRouteRepository;
  let removeRoute: RemoveRoute;
  let leHavreDieppeRoute: Route;

  beforeEach(() => {
    routeRepository = new InMemoryRouteRepository();
    removeRoute = new RemoveRoute(routeRepository);
    leHavreDieppeRoute = Route.create('Le Havre - Dieppe', [
      Waypoint.create(49.4935, -0.1574),
      Waypoint.create(50.0, 1.8),
    ]).value as Route;
    routeRepository.add(leHavreDieppeRoute);
  });

  it('should remove an existing route from the repository', async () => {
    expect(routeRepository.getByName('Le Havre - Dieppe')).toBeDefined();

    await removeRoute.execute(leHavreDieppeRoute);

    expect(routeRepository.getByName('Le Havre - Dieppe')).toBeNull();
  });

  it('should not throw an error when removing a non-existent route', async () => {
    const nonExistentRoute = Route.create('Non-existent Route', [
      Waypoint.create(0, 0),
      Waypoint.create(1, 1),
    ]).value as Route;

    await expect(removeRoute.execute(nonExistentRoute)).resolves.not.toThrow();
  });
});
