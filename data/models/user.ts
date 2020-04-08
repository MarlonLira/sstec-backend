import { Model, DataTypes, BelongsToManyAddAssociationMixin } from 'sequelize';

import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/helpers';
import Vehicle from './vehicle';

var _instance = DbInstance.getInstance()

/**
 * @description
 * @author Marlon Lira
 * @class User
 * @extends {Model}
 */
class User extends Model {

  id!: number;
  status!: string;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!: string;
  password!: string;
  vehicles!: Vehicle[];

  /**
   * @description
   * @type {BelongsToManyAddAssociationMixin<Vehicle, number>}
   * @memberof User
   */
  public addVehicles!: BelongsToManyAddAssociationMixin<Vehicle, number>;

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
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  registryCode: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(12)
  },
  email: {
    type: DataTypes.STRING(50)
  },
  password: {
    type: DataTypes.STRING(100)
  }
}, {
  sequelize: _instance,
  tableName: 'User',
  modelName: 'user'
});

export default User;