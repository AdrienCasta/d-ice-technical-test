import { Route } from '@domain/entities';
import type { RouteRepository } from '@domain/repositories';

export default class AddRoute {
  constructor(private routes: RouteRepository) {}

  execute(route: Route): void {
    this.routes.add(route);
  }
}
