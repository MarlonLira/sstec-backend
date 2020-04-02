import { Model, DataTypes } from 'sequelize';

import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/helpers';
import * as Config from '../../config.json';

var _reSync = Config.Database.ForceSync;
var _instance = new DbInstance().getInstance();

/**
 * @description
 * @author Marlon Lira
 * @class User
 * @extends {Model}
 */
class User extends Model {

  id!: number;
  status: string;
  name: string;
  registryCode!: string;
  phone!: string;
  email!: string;
  password!: string;
  vehicles!: {};

  /**
   *Creates an instance of User.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof User
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.phone = Attributes.ReturnIfValid(json.phone);
    this.email = Attributes.ReturnIfValid(json.email);
    this.password = Attributes.ReturnIfValid(json.password);
    this.vehicles = Attributes.ReturnIfValid(json.vehicles);

  }
}

User.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.CHAR(2),
    allowNull: false
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
  password: {
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
export default User;