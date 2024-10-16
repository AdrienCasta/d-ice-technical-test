import GetRoutes from '../../application/usecases/GetRoutes/GetRoutes';
import { Route } from '../../domain/entities';

export default class GetRoutesController {
  constructor(private readonly getRoutes: GetRoutes) {}

  async handle(): Promise<Route[]> {
    return this.getRoutes.execute();
  }
}
