"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DbContext_1 = require("../context/DbContext");
var _instance = new DbContext_1.DbInstance().getInstance();
class Employee extends sequelize_1.Model {
    constructor(json) {
        super();
        if (json != undefined) {
            this.id = json.id;
            this.firstName = json.firstName;
            this.lastName = json.lastName;
            this.status = json.status;
            this.registryCode = json.registryCode;
            this.phone = json.phone;
            this.salary = json.salary;
        }
    }
}
exports.Employee = Employee;
Employee.init({
    id: {
        type: new sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: new sequelize_1.DataTypes.INTEGER
    },
    firstName: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    lastName: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    registryCode: {
        type: new sequelize_1.DataTypes.STRING(12),
        allowNull: false
    },
    phone: {
        type: new sequelize_1.DataTypes.STRING(12)
    },
    salary: {
        type: new sequelize_1.DataTypes.FLOAT
    }
}, {
    sequelize: _instance,
    tableName: 'Employee',
});
Employee.sync({ force: false });
//# sourceMappingURL=Employee.js.map