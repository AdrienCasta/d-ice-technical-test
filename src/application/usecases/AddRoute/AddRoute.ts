import { Route } from '@domain/entities';
import type { RouteRepository } from '@domain/repositories';
import Result from '../../../shared/Result';

export default class AddRoute {
  constructor(private routes: RouteRepository) {}

  async execute(routeOrError: Result<Route, Error>): Promise<void> {
    if (routeOrError.isFailure()) {
      throw routeOrError.error;
    }

    const route = routeOrError.value as Route;

    const existingRoute = await this.routes.getByName(route.name);

    if (existingRoute) {
      throw new Error('Route already exists');
    }
    this.routes.add(route);
  }
}
