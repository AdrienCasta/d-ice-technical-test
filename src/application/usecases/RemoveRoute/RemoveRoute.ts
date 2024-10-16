import { RouteRepository } from '../../../domain/repositories';

export default class RemoveRoute {
  constructor(private routeRepository: RouteRepository) {}

  async execute(routeId: string): Promise<void> {
    this.routeRepository.remove(routeId);
  }
}
