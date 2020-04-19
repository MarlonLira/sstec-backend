import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Emerson Souza
 * @class ParkingSpace
 * @extends {Model}
 */
class ParkingSpace extends Model {
  id!: number;
  status!: TransactionType;
  description!: string;
  value: number;
  parkingId!: number;

  /**
   * Creates an instance of ParkingSpace.
   * @author Emerson Souza
   * @param {*} [json]
   * @memberof ParkingSpace
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.description = Attributes.ReturnIfValid(json.description);
    this.value = Attributes.ReturnIfValid(json.value);
    this.parkingId = Attributes.ReturnIfValid(json.parkingId);
  }
}

ParkingSpace.init({
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
  description: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  value: {
    type: new DataTypes.DOUBLE(),
    allowNull: false
  },
  parkingId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'ParkingSpace'
});

export default ParkingSpace;