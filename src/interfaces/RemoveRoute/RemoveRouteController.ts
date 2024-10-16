import RemoveRoute from '../../application/usecases/RemoveRoute/RemoveRoute';
import {
  type RemoveRouteParams,
  validateRemoveRouteParams,
} from './RemoveRouteParams';

export default class RemoveRouteController {
  constructor(private readonly removeRoute: RemoveRoute) {}

  async handle(removeRouteParams: RemoveRouteParams) {
    if (!validateRemoveRouteParams(removeRouteParams)) {
      throw new Error('Invalid route params');
    }
    return this.removeRoute.execute(removeRouteParams.id);
  }
}
