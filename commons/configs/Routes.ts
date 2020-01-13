import { Route } from '../functions/Route';
import ClientController from '../../controllers/ClientController';
import EmployeeController from '../../controllers/EmployeeController';

module.exports = function(server) {
    Route.Register(server, ClientController);
    Route.Register(server, EmployeeController);
}