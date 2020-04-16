import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';

const _instance = Context.getInstance();

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
  userId!: number;

  /**
   * Creates an instance of Vehicle.
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
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.ENUM(),
    allowNull: true,
    values: ['AT', 'PD', 'EX']
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
    type: DataTypes.STRING(50),
    allowNull: false
  },
  licensePlate: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  userId :{
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Vehicle'
});

export default Vehicle;