import { Route } from '../../../domain/entities';
import { RouteRepository } from '../../../domain/repositories';

export default class GetRoutes {
  constructor(private routes: RouteRepository) {}

  async execute(): Promise<Route[]> {
    return this.routes.getAll();
  }
}
