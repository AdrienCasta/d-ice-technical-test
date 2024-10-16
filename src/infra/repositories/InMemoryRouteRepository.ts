import { Route } from '@domain/entities';
import type { RouteRepository } from '@domain/repositories';

export default class InMemoryRouteRepository implements RouteRepository {
  private routes: Route[] = [];

  add(route: Route): void {
    this.routes.push(route);
  }

  getById(id: string): Route | null {
    return this.routes.find((route) => route.id === id) ?? null;
  }

  update(route: Route): void {
    this.routes = this.routes.map((r) => (r.id === route.id ? route : r));
  }

  remove(route: Route): void {
    this.routes = this.routes.filter((r) => r.name !== route.name);
  }

  getByName(name: string): Route | null {
    return this.routes.find((route) => route.name === name) ?? null;
  }
}
