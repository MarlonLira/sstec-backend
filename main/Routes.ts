import { Route, RouteAuth } from '../commons/functions/Route';
import ClientController from '../controllers/ClientController';
import EmployeeController from '../controllers/EmployeeController';
import BillingCycleController from '../controllers/BillingCycleController';
import ProductController from '../controllers/ProductController';
import DashboardController from '../controllers/DashboardController';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

module.exports = function (server) {
  RouteAuth.Register(server, AuthController);

  Route.Register(server, ClientController);
  Route.Register(server, EmployeeController);
  Route.Register(server, BillingCycleController);
  Route.Register(server, ProductController);
  Route.Register(server, DashboardController);
  Route.Register(server, UserController);
  
}