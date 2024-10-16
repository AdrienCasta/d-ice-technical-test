import { FastifyInstance } from 'fastify';

import addRouteHttpRoute from './AddRoute/AddRouteHttpRoute';
import GetRoutesController from './GetRoutes/GetRoutesController';
import getRoutesHttpRoute from './GetRoutes/GetRoutesHttpRoute';
import RemoveRouteController from './RemoveRoute/RemoveRouteController';
import removeRouteHttpRoute from './RemoveRoute/RemoveRouteHttpRoute';
import EditRouteController from './EditRoute/EditRouteController';
import editRouteHttpRoute from './EditRoute/EditRouteHttpRoute';
import {
  AddRoute,
  EditRoute,
  GetRoutes,
  RemoveRoute,
} from '../application/usecases';
import { InMemoryRouteRepository } from '../infra/repositories';
import AddRouteController from './AddRoute/AddRouteController';

export default function routeRoutes(fastify: FastifyInstance) {
  const routeRepository = new InMemoryRouteRepository();
  const getRoutesController = new GetRoutesController(
    new GetRoutes(routeRepository)
  );
  const addRouteController = new AddRouteController(
    new AddRoute(routeRepository)
  );
  const removeRouteController = new RemoveRouteController(
    new RemoveRoute(routeRepository)
  );
  const editRouteController = new EditRouteController(
    new EditRoute(routeRepository)
  );

  addRouteHttpRoute(fastify, addRouteController);
  getRoutesHttpRoute(fastify, getRoutesController);
  removeRouteHttpRoute(fastify, removeRouteController);
  editRouteHttpRoute(fastify, editRouteController);
}
