import { type EditRouteBody, validateEditRouteBody } from './EditRouteBody';
import { Route, Waypoint } from '../../domain/entities';
import EditRoute from '../../application/usecases/EditRoute/EditRoute';
export default class EditRouteController {
  constructor(private readonly editRoute: EditRoute) {}

  async handle(route: EditRouteBody) {
    if (!validateEditRouteBody(route).success) {
      throw new Error('Params are invalid');
    }

    return this.editRoute.execute(
      route.id,
      Route.create(
        route.name,
        route.waypoints.map((waypoint) =>
          Waypoint.create(waypoint.latitude, waypoint.longitude)
        )
      )
    );
  }
}
