"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = require("./commons/functions/Route");
const ClientController_1 = require("./controllers/ClientController");
const EmployeeController_1 = require("./controllers/EmployeeController");
module.exports = function (server) {
    Route_1.Route.Register(server, ClientController_1.default);
    Route_1.Route.Register(server, EmployeeController_1.default);
};
//# sourceMappingURL=Routes.js.map