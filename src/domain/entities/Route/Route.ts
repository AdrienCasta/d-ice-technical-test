import type { Waypoint } from '@domain/entities';

export default class Route {
  constructor(
    public readonly name: string,
    private readonly waypoints: Waypoint[]
  ) {}
}
