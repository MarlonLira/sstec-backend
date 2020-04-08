import { Model, DataTypes } from 'sequelize';

import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/helpers';
import User from './user';

var _instance = DbInstance.getInstance()

/**
 * @description
 * @author Marlon Lira
 * @class Vehicle
 * @extends {Model}
 */
class Vehicle extends Model {

  id!: number;
  status!: string;
  model!: string;
  color!: string;
  type!: string;
  licensePlate!: string;
  users: User[];

  /**
   *Creates an instance of Vehicle.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof Vehicle
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.model = Attributes.ReturnIfValid(json.model);
    this.color = Attributes.ReturnIfValid(json.color);
    this.type = Attributes.ReturnIfValid(json.type);
    this.licensePlate = Attributes.ReturnIfValid(json.licensePlate);
    this.users = Attributes.ReturnIfValid(json.users);
  }

}

Vehicle.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  model: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  licensePlate: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Vehicle',
  modelName: 'vehicle'
});

export default Vehicle;