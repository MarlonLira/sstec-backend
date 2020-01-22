"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig = require("../commons/configs/DbConfig.json");
var _instance = null;
var _dbConfig = dbConfig.PostgreSQL;
class DbContext {
    constructor() {
        this.userName = _dbConfig.username;
        this.password = _dbConfig.password;
        this.host = _dbConfig.host;
        this.Schema = _dbConfig.schema;
        this.port = _dbConfig.port;
    }
    getNewInstance() {
        const sequelize = new sequelize_1.Sequelize(this.Schema, this.userName, this.password, {
            port: this.port,
            host: this.host,
            dialect: 'postgres',
            ssl: true
        });
        return sequelize;
    }
}
class DbInstance {
    getInstance() {
        return (_instance !== null && _instance !== void 0 ? _instance : new DbContext().getNewInstance());
    }
}
exports.DbInstance = DbInstance;
//# sourceMappingURL=DbContext.js.map