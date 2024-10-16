import { Route } from '../entities';
export default interface RouteRepository {
  add(route: Route): Promise<void>;
  remove(routeId: string): Promise<void>;
  update(route: Route): Promise<void>;
  getByName(name: string): Promise<Route | null>;
  getById(id: string): Promise<Route | null>;
  getAll(): Promise<Route[]>;
}
