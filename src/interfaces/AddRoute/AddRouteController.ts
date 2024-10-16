import AddRoute from '../../application/usecases/AddRoute/AddRoute';
import { Route, Waypoint } from '../../domain/entities';
import { type AddRouteParams, validateAddRouteBody } from './AddRouteBody';

export default class AddRouteController {
  constructor(private readonly addRoute: AddRoute) {}

  async handle(route: AddRouteParams) {
    if (!validateAddRouteBody(route).success) {
      throw new Error('Params are invalid');
    }

    return this.addRoute.execute(
      Route.create(
        route.name,
        route.waypoints.map((waypoint) =>
          Waypoint.create(waypoint.latitude, waypoint.longitude)
        )
      )
    );
  }
}
