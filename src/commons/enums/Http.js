"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["Continue"] = 100] = "Continue";
    HttpCode[HttpCode["Processing"] = 102] = "Processing";
    HttpCode[HttpCode["Ok"] = 200] = "Ok";
    HttpCode[HttpCode["Created"] = 201] = "Created";
    HttpCode[HttpCode["Accepted"] = 202] = "Accepted";
    HttpCode[HttpCode["Found"] = 302] = "Found";
    HttpCode[HttpCode["Bad_Request"] = 400] = "Bad_Request";
    HttpCode[HttpCode["Unauthorized"] = 401] = "Unauthorized";
    HttpCode[HttpCode["Forbidden"] = 403] = "Forbidden";
    HttpCode[HttpCode["Not_Found"] = 404] = "Not_Found";
    HttpCode[HttpCode["Expectation_Failed"] = 417] = "Expectation_Failed";
    HttpCode[HttpCode["Internal_Server_Error"] = 500] = "Internal_Server_Error";
    HttpCode[HttpCode["Not_Implemented"] = 501] = "Not_Implemented";
    HttpCode[HttpCode["Bad_Gateway"] = 502] = "Bad_Gateway";
    HttpCode[HttpCode["Service_Unavailable"] = 503] = "Service_Unavailable";
})(HttpCode || (HttpCode = {}));
exports.HttpCode = HttpCode;
//# sourceMappingURL=Http.js.map