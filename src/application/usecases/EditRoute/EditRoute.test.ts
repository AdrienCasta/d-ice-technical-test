import { Route, Waypoint } from '@domain/entities';
import { InMemoryRouteRepository } from '@infra/repositories';
import EditRoute from './EditRoute';
import Maybe from 'src/shared/Maybe';

describe('EditRoute', () => {
  let routeRepository: InMemoryRouteRepository;
  let editRoute: EditRoute;
  let leHavreDieppeRoute: Route;
  let leHavreWaypoint: Maybe<Waypoint>;
  let dieppeWaypoint: Maybe<Waypoint>;

  beforeEach(() => {
    routeRepository = new InMemoryRouteRepository();
    editRoute = new EditRoute(routeRepository);

    leHavreWaypoint = Waypoint.create(49.4935, -0.1574);
    dieppeWaypoint = Waypoint.create(50.0, 1.8);

    leHavreDieppeRoute = Route.create('Le Havre - Dieppe', [
      leHavreWaypoint,
      dieppeWaypoint,
    ]).value as Route;

    routeRepository.add(leHavreDieppeRoute);
  });

  it('can add a new waypoint to a route', async () => {
    const fosSurMerWaypoint = Waypoint.create(49.9923, 1.8562);

    const leHavreDieppeFosSurMerRoute = leHavreDieppeRoute.update(
      Route.create('Le Havre - Dieppe - Fos sur Mer', [
        leHavreWaypoint,
        fosSurMerWaypoint,
      ])
    );

    await editRoute.execute(leHavreDieppeFosSurMerRoute);

    expect(routeRepository.getById(leHavreDieppeRoute.id)).toEqual(
      leHavreDieppeFosSurMerRoute.value
    );
  });

  it('can update waypoints of a route', async () => {
    const fosSurMerWaypoint = Waypoint.create(49.9923, 1.8562);

    const leHavreFosSurMerRoute = leHavreDieppeRoute.update(
      Route.create('Le Havre - Fos sur Mer', [
        leHavreWaypoint,
        fosSurMerWaypoint,
      ])
    );

    await editRoute.execute(leHavreFosSurMerRoute);

    expect(routeRepository.getById(leHavreDieppeRoute.id)?.waypoints).toEqual(
      leHavreFosSurMerRoute.value?.waypoints
    );
  });

  it('can update the name of a route', async () => {
    const fosSurMerWaypoint = Waypoint.create(49.9923, 1.8562);

    const leHavreFosSurMerDieppeRoute = leHavreDieppeRoute.update(
      Route.create('Le Havre - Dieppe - Fos sur Mer', [
        leHavreWaypoint,
        dieppeWaypoint,
        fosSurMerWaypoint,
      ])
    );

    await editRoute.execute(leHavreFosSurMerDieppeRoute);

    expect(routeRepository.getById(leHavreDieppeRoute.id)?.name).toEqual(
      leHavreFosSurMerDieppeRoute.value?.name
    );
  });
});
