import { Route } from '@domain/entities';
import type { RouteRepository } from '@domain/repositories';
import Maybe from 'src/shared/Maybe';

export default class EditRoute {
  constructor(private routeRepository: RouteRepository) {}

  async execute(route: Maybe<Route>): Promise<void> {
    if (route.isFailure()) {
      throw route.error;
    }

    this.routeRepository.update(route.value as Route);
  }
}
