import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @class ParkingService
 * @extends {Model}
 */
export class ParkingService extends Model {
  id!: number;
  status!: TransactionType;
  name!: string;
  description!: string;
  value: number;
  parkingId!: number;

  /**
   * Creates an instance of ParkingService.
   * @author Gustavo Gusmão
   * @param {*} [json]
   * @memberof ParkingService
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.name = Attributes.ReturnIfValid(json.name);
    this.description = Attributes.ReturnIfValid(json.description);
    this.value = Attributes.ReturnIfValid(json.value);
    this.parkingId = Attributes.ReturnIfValid(json.parkingId);
  }
  ToAny() {
    return this.toJSON();
  }
}

ParkingService.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  name: {
    type: new DataTypes.STRING(10),
    allowNull: false
  },
  description: {
    type: new DataTypes.STRING(60),
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
  tableName: 'ParkingService'
});