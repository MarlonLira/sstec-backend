import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../context/DbContext';
import { Attributes } from '../commons/Helpers';
import * as Config from '../config.json';

var _reSync = Config.Database.ForceSync;
var _instance = new DbInstance().getInstance();

class User extends Model {

  id!: number;
  status: number;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!: string;
  password!: string;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.phone = Attributes.ReturnIfValid(json.phone);
    this.email = Attributes.ReturnIfValid(json.email);
    this.password = Attributes.ReturnIfValid(json.password);
  }
}

User.init({
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
  },
  password:{
    type: new DataTypes.STRING(100)
  }
}, {
  sequelize: _instance,
  tableName: 'User',
  scopes: {
    public: {
      attributes: ['id', 'name', 'phone', 'email', 'registryCode']
    }
  }
});

User.sync({ force: _reSync });

export { User };