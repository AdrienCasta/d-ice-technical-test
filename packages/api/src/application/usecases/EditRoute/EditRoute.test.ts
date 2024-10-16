import { Route, Waypoint } from '../../../domain/entities';
import { InMemoryRouteRepository } from '../../../infra/repositories';
import Maybe from '../../../shared/Maybe';
import EditRoute from './EditRoute';

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

    const leHavreDieppeFosSurMerRoute = Route.create(
      'Le Havre - Dieppe - Fos sur Mer',
      [leHavreWaypoint, fosSurMerWaypoint]
    );

    await editRoute.execute(leHavreDieppeRoute.id, leHavreDieppeFosSurMerRoute);

    expect(
      (await routeRepository.getById(leHavreDieppeRoute.id))?.waypoints
    ).toEqual(leHavreDieppeFosSurMerRoute.value?.waypoints);
  });

  it('can update waypoints of a route', async () => {
    const fosSurMerWaypoint = Waypoint.create(49.9923, 1.8562);

    const leHavreFosSurMerRoute = Route.create('Le Havre - Fos sur Mer', [
      leHavreWaypoint,
      fosSurMerWaypoint,
    ]);

    await editRoute.execute(leHavreDieppeRoute.id, leHavreFosSurMerRoute);

    expect(
      (await routeRepository.getById(leHavreDieppeRoute.id))?.waypoints
    ).toEqual(leHavreFosSurMerRoute.value?.waypoints);
  });

  it('can update the name of a route', async () => {
    const fosSurMerWaypoint = Waypoint.create(49.9923, 1.8562);

    const leHavreFosSurMerDieppeRoute = Route.create(
      'Le Havre - Dieppe - Fos sur Mer',
      [leHavreWaypoint, dieppeWaypoint, fosSurMerWaypoint]
    );

    await editRoute.execute(leHavreDieppeRoute.id, leHavreFosSurMerDieppeRoute);

    expect(
      (await routeRepository.getById(leHavreDieppeRoute.id))?.name
    ).toEqual(leHavreFosSurMerDieppeRoute.value?.name);
  });
});
