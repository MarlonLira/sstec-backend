import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../context/DbContext';

var _instance = new DbInstance().getInstance();

class Client extends Model {

	public id!: number;
	public status : number;
	public firstName!: string;
	public lastName!: string;
	public registryCode!: string;
	public phone!: string;

	constructor(json?: any) {
		super()
		if (json != undefined) {
			this.id = json.id;
			this.firstName = json.firstName;
			this.lastName = json.lastName;
			this.status = json.status;
			this.registryCode = json.registryCode;
			this.phone = json.phone;
		}
	}
}

Client.init({
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
	}
}, {
	sequelize: _instance,
	tableName: 'Client',
	scopes: {
		public: {
			attributes: ['id', 'firstName', 'lastName', 'phone', 'registryCode']
		}
	}
});

Client.sync({force: false});

export { Client };