import { Model, DataTypes } from 'sequelize';

import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/Helpers';
import * as Config from '../../config.json';

var _reSync = Config.Database.ForceSync;
var _instance = new DbInstance().getInstance();

/**
 * @description
 * @author Marlon Lira
 * @class Vehicle
 * @extends {Model}
 */
class Vehicle extends Model {

  id!: number;
  status: string;
  model: string;
  color: string;
  type: string;
  licensePlate: string;
  userId: number;

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
    this.userId = Attributes.ReturnIfValid(json.userId);
  }

}

Vehicle.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.CHAR(2),
    allowNull: false
  },
  model: {
    type: new DataTypes.STRING(12),
    allowNull: false
  },
  color: {
    type: new DataTypes.STRING(12),
    allowNull: false
  },
  type: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  licensePlate: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  userId: {
    type: new DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    }
  }
}, {
  sequelize: _instance,
  tableName: 'Vehicle'
});

Vehicle.sync({ force: _reSync });

export default Vehicle;