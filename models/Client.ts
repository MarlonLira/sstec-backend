import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../context/DbContext';
import { Attributes } from '../commons/Helpers';

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
			this.id = Attributes.ReturnIfValid(json.id);
			this.firstName = Attributes.ReturnIfValid(json.firstName);
			this.lastName = Attributes.ReturnIfValid(json.lastName);
			this.status = Attributes.ReturnIfValid(json.status);
			this.registryCode = Attributes.ReturnIfValid(json.registryCode);
			this.phone = Attributes.ReturnIfValid(json.phone);
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
		type: new DataTypes.STRING(30),
		allowNull: false
	},
	lastName: {
		type: new DataTypes.STRING(30),
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