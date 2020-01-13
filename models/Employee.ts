import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../context/DbContext';

var _instance = new DbInstance().getInstance();

class Employee extends Model {
	public id!: number;
	public status: number;
	public firstName!: string;
	public lastName!: string;
	public registryCode!: string;
	public phone!: string;
	public salary: number;

	constructor(json?: any) {
		super()
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

Employee.init({
	id: {
		type: new DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	status: {
		type: new DataTypes.INTEGER
	},
	firstName: {
		type: new DataTypes.STRING(128),
		allowNull: false
	},
	lastName: {
		type: new DataTypes.STRING(128),
		allowNull: false
	},
	registryCode: {
		type: new DataTypes.STRING(12),
		allowNull: false
	},
	phone: {
		type: new DataTypes.STRING(12)
	},
	salary: {
		type: new DataTypes.FLOAT
	}
}, {
	sequelize: _instance,
	tableName: 'Employee',
});

Employee.sync({ force: false });

export { Employee };