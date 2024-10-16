import { randomUUID } from 'crypto';
import Result from '../../../shared/Result';

import { Waypoint } from '..';
import Maybe from '../../../shared/Maybe';
export default class Route {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly waypoints: Waypoint[]
  ) {
    this.id = id;
  }

  static create(
    name: string,
    waypointsOrErrors: Maybe<Waypoint>[]
  ): Maybe<Route> {
    if (hasInsufficientWaypoints(waypointsOrErrors)) {
      return Result.failure(new InsufficientWaypointsError());
    }

    if (hasInvalidWaypoint(waypointsOrErrors)) {
      return Result.failure(new InvalidWaypointError());
    }

    return Result.success(
      new Route(
        randomUUID(),
        name,
        waypointsOrErrors.map((waypoint) => waypoint.value as Waypoint)
      )
    );
  }

  update(route: Maybe<Route>): Maybe<Route> {
    if (route.isFailure()) {
      return Result.failure(route.error);
    }

    const updatedRoute = route.value as Route;

    return Result.success(
      new Route(this.id, updatedRoute.name, updatedRoute.waypoints)
    );
  }
}

export class InvalidWaypointError extends Error {
  constructor() {
    super('Invalid waypoint');
  }
}

export class InsufficientWaypointsError extends Error {
  constructor() {
    super('A route must have at least two waypoints');
  }
}

function hasInsufficientWaypoints(
  waypointsOrErrors: Maybe<Waypoint>[]
): boolean {
  return waypointsOrErrors.length < 2;
}

function hasInvalidWaypoint(waypointsOrErrors: Maybe<Waypoint>[]): boolean {
  return waypointsOrErrors.some((waypoint) => waypoint.isFailure());
}
