"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const allowCors = require('./Cors');
const port = process.env.PORT || 4001;
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);
server.listen(port, function () {
    console.log(`BACKEND is running on port ${port}.`);
});
module.exports = server;
//# sourceMappingURL=Server.js.map