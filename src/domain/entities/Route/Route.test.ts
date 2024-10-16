import { Route, Waypoint } from '../';
import { InsufficientWaypointsError, InvalidWaypointError } from './Route';

describe('Route', () => {
  const leHavreWaypoint = Waypoint.create(49.4937, 0.1077);
  const dieppeWaypoint = Waypoint.create(50.3793, 1.6296);
  const invalidLatitudeWaypoint = Waypoint.create(91, 0);

  it('creates a valid route with two waypoints', () => {
    const leHavreDieppeRoute = Route.create('Le Havre - Dieppe', [
      leHavreWaypoint,
      dieppeWaypoint,
    ]);

    expect(leHavreDieppeRoute.isSuccess()).toBe(true);
    expect(leHavreDieppeRoute.value?.name).toBe('Le Havre - Dieppe');
  });

  it('fails to create a route with insufficient waypoints', () => {
    const insufficientWaypointsRoute = Route.create('Le Havre - Dieppe', [
      leHavreWaypoint,
    ]);
    expect(insufficientWaypointsRoute.isSuccess()).toBe(false);
    expect(insufficientWaypointsRoute.error).toBeInstanceOf(
      InsufficientWaypointsError
    );
  });

  it('fails to create a route with invalid waypoints', () => {
    const invalidWaypointRoute = Route.create('Le Havre - Invalid', [
      leHavreWaypoint,
      invalidLatitudeWaypoint,
    ]);
    expect(invalidWaypointRoute.isSuccess()).toBe(false);
    expect(invalidWaypointRoute.error).toBeInstanceOf(InvalidWaypointError);
  });

  it('can add a new waypoint to a route', () => {
    const leHavreDieppeRoute = Route.create('Le Havre - Dieppe', [
      leHavreWaypoint,
      dieppeWaypoint,
    ]).value as Route;

    const fosSurMerWaypoint = Waypoint.create(49.9923, 1.8562);

    const updatedRoute = leHavreDieppeRoute.update(
      Route.create('Le Havre - Dieppe - Fos sur Mer', [
        leHavreWaypoint,
        dieppeWaypoint,
        fosSurMerWaypoint,
      ])
    );

    expect(updatedRoute.isSuccess()).toBe(true);
    expect(updatedRoute.value?.waypoints).toHaveLength(3);
  });

  it('can update a waypoints of a route', () => {
    const leHavreDieppeRoute = Route.create('Le Havre - Dieppe', [
      leHavreWaypoint,
      dieppeWaypoint,
    ]).value as Route;

    const fosSurMerWaypoint = Waypoint.create(49.9923, 1.8562);

    const updatedRoute = leHavreDieppeRoute.update(
      Route.create('Le Havre - Dieppe - Fos sur Mer', [
        leHavreWaypoint,
        fosSurMerWaypoint,
      ])
    );

    expect(updatedRoute.isSuccess()).toBe(true);
    expect(updatedRoute.value?.waypoints).toHaveLength(2);
    expect(updatedRoute.value?.waypoints).toEqual([
      leHavreWaypoint.value as Waypoint,
      fosSurMerWaypoint.value as Waypoint,
    ]);
  });
});
