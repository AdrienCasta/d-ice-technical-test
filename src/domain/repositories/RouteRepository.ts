import type { Route } from '@domain/entities';

export default interface RouteRepository {
  add(route: Route): void;
  getByName(name: string): Route | null;
}
