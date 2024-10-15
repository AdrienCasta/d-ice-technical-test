import type { Waypoint } from '@domain/entities';
import { randomUUID } from 'crypto';
import Result from '../../../shared/Result';

export default class Route {
  id: string;
  private constructor(
    public readonly name: string,
    private readonly waypoints: Waypoint[]
  ) {
    this.id = randomUUID();
  }

  static create(
    name: string,
    waypointsOrErrors: Result<Waypoint, Error>[]
  ): Result<Route, Error> {
    if (hasInsufficientWaypoints(waypointsOrErrors)) {
      return Result.failure(new InsufficientWaypointsError());
    }

    if (hasInvalidWaypoint(waypointsOrErrors)) {
      return Result.failure(new InvalidWaypointError());
    }

    return Result.success(
      new Route(
        name,
        waypointsOrErrors.map((waypoint) => waypoint.value as Waypoint)
      )
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
  waypointsOrErrors: Result<Waypoint, Error>[]
): boolean {
  return waypointsOrErrors.length < 2;
}

function hasInvalidWaypoint(
  waypointsOrErrors: Result<Waypoint, Error>[]
): boolean {
  return waypointsOrErrors.some((waypoint) => waypoint.isFailure());
}
