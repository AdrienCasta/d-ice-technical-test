import { Route } from '@domain/entities';
import type { RouteRepository } from '@domain/repositories';

export default class RemoveRoute {
  constructor(private routeRepository: RouteRepository) {}

  async execute(route: Route): Promise<void> {
    this.routeRepository.remove(route);
  }
}
