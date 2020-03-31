import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/Helpers';
import * as Config from '../../config.json';

var _reSync = Config.Database.ForceSync;
var _instance = new DbInstance().getInstance();

class Client extends Model {

  id!: number;
  status: number;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!: string;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.phone = Attributes.ReturnIfValid(json.phone);
    this.email = Attributes.ReturnIfValid(json.email);
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
  name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  registryCode: {
    type: new DataTypes.STRING(12),
    allowNull: false
  },
  phone: {
    type: new DataTypes.STRING(12)
  },
  email: {
    type: new DataTypes.STRING(50)
  }
}, {
  sequelize: _instance,
  tableName: 'Client',
  scopes: {
    public: {
      attributes: ['id', 'name', 'phone', 'email', 'registryCode']
    }
  }
});

Client.sync({ force: _reSync });

export { Client };