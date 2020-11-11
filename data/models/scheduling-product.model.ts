import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { Scheduling } from './scheduling.model';
import { ParkingProduct } from './parking-product.model';

const _instance = Context.getInstance();

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @class SchedulingProduct
 * @extends {Model}
 */
export class SchedulingProduct extends Model {

  id!: number;
  status!: TransactionType;
  value!: number;
  parkingProductId!: number;
  schedulingId!: number;

  scheduling: Scheduling;
  parkingProduct: ParkingProduct;

  /**
   * Creates an instance of SchedulingProduct.
   * @author Gustavo Gusmão
   * @param {*} [json]
   * @memberof SchedulingProduct
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.value = Attributes.ReturnIfValid(json.value);
    this.parkingProductId = Attributes.ReturnIfValid(json.parkingProductId);
    this.schedulingId = Attributes.ReturnIfValid(json.schedulingId);
    this.parkingProduct = Attributes.ReturnIfValid(json.parkingProduct);
    this.scheduling = Attributes.ReturnIfValid(json.sheduling);
  }

  ToAny() {
    return this.toJSON();
  }
}

SchedulingProduct.init({
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
  parkingProductId: {
    type: new DataTypes.INTEGER()
  },
  schedulingId: {
    type: new DataTypes.INTEGER()
  }
}, {
  sequelize: _instance,
  tableName: 'SchedulingProduct'
});