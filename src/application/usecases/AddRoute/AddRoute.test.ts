import { Route, Waypoint } from '@domain/entities';
import AddRoute from './AddRoute';
import { InMemoryRouteRepository } from '@infra/repositories';
import Result from 'src/shared/Result';

describe('adding a route', () => {
  const brestWaypoint = Waypoint.create(48.3906, -4.486);
  const saintNazaireWaypoint = Waypoint.create(47.268, -2.778);

  let routeRepository: InMemoryRouteRepository;
  let addRoute: AddRoute;
  let mayBeBreastSaintNazaireRoute: Result<Route, Error>;

  beforeEach(() => {
    routeRepository = new InMemoryRouteRepository();
    addRoute = new AddRoute(routeRepository);

    mayBeBreastSaintNazaireRoute = Route.create('Brest-Saint-Nazaire', [
      brestWaypoint,
      saintNazaireWaypoint,
    ]);
  });

  it('knows to add a valid route', async () => {
    await addRoute.execute(mayBeBreastSaintNazaireRoute);

    expect(
      routeRepository.getByName(
        (mayBeBreastSaintNazaireRoute.value as Route).name
      )
    ).toEqual(mayBeBreastSaintNazaireRoute.value);
  });

  it('knows it cannot add a route with the same name', async () => {
    await addRoute.execute(mayBeBreastSaintNazaireRoute);

    const brestSaintNazaireRoute2 = Route.create('Brest-Saint-Nazaire', [
      brestWaypoint,
      saintNazaireWaypoint,
    ]);

    await expect(addRoute.execute(brestSaintNazaireRoute2)).rejects.toThrow(
      'Route already exists'
    );

    expect(
      routeRepository.getByName(
        (mayBeBreastSaintNazaireRoute.value as Route).name
      )?.id
    ).toEqual((mayBeBreastSaintNazaireRoute.value as Route).id);
  });

  it('knows it cannot add a route with invalid waypoints', async () => {
    const invalidWaypoint = Waypoint.create(91, 0);
    const brestSaintNazaireRoute2 = Route.create('Brest-Saint-Nazaire', [
      brestWaypoint,
      invalidWaypoint,
    ]);

    await expect(addRoute.execute(brestSaintNazaireRoute2)).rejects.toThrow();
  });
});
