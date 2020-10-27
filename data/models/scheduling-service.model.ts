import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @class SchedulingService
 * @extends {Model}
 */
export class SchedulingService extends Model {

  id!: number;
  status!: TransactionType;
  value!: number;
  parkingServiceId!: number;
  schedulingId!: number;

  /**
   * Creates an instance of SchedulingService.
   * @author Gustavo Gusmão
   * @param {*} [json]
   * @memberof SchedulingService
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.value = Attributes.ReturnIfValid(json.value);
    this.parkingServiceId = Attributes.ReturnIfValid(json.parkingServiceId);
    this.schedulingId = Attributes.ReturnIfValid(json.schedulingId);
  }

  ToAny() {
    return this.toJSON();
  }
}

SchedulingService.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  value: {
    type: new DataTypes.INTEGER()
  },
  parkingServiceId: {
    type: new DataTypes.INTEGER()
  },
  schedulingId: {
    type: new DataTypes.INTEGER()
  }
}, {
  sequelize: _instance,
  tableName: 'SchedulingService'
});