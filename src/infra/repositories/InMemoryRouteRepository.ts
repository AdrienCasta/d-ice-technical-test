import { Route } from '../../domain/entities';
import RouteRepository from '../../domain/repositories/RouteRepository';

export default class InMemoryRouteRepository implements RouteRepository {
  private routes: Route[] = [];

  async add(route: Route): Promise<void> {
    this.routes.push(route);
  }

  async getById(id: string): Promise<Route | null> {
    return this.routes.find((route) => route.id === id) ?? null;
  }

  async getAll(): Promise<Route[]> {
    return this.routes;
  }

  async update(route: Route): Promise<void> {
    this.routes = this.routes.map((r) => (r.id === route.id ? route : r));
  }

  async remove(routeId: string): Promise<void> {
    this.routes = this.routes.filter((r) => r.id !== routeId);
  }

  async getByName(name: string): Promise<Route | null> {
    return this.routes.find((route) => route.name === name) ?? null;
  }
}
