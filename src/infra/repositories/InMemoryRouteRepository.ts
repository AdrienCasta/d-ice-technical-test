import { Route } from '@domain/entities';
import type { RouteRepository } from '@domain/repositories';

export default class InMemoryRouteRepository implements RouteRepository {
  private routes: Route[] = [];

  add(route: Route): void {
    this.routes.push(route);
  }

  getByName(name: string): Route | null {
    return this.routes.find((route) => route.name === name) ?? null;
  }
}
