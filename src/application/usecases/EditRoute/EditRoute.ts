import { Route } from '../../../domain/entities';
import { RouteRepository } from '../../../domain/repositories';
import Maybe from '../../../shared/Maybe';

export default class EditRoute {
  constructor(private routeRepository: RouteRepository) {}

  async execute(routeId: string, updatedRoute: Maybe<Route>): Promise<void> {
    const storedRoute = await this.routeRepository.getById(routeId);
    if (storedRoute === null) {
      throw new Error('Route not found');
    }

    const routeToUpdate = storedRoute.update(updatedRoute);

    if (routeToUpdate.isFailure()) {
      throw routeToUpdate.error;
    }

    this.routeRepository.update(routeToUpdate.value as Route);
  }
}
