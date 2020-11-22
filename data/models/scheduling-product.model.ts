import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { Scheduling } from './scheduling.model';
import { ParkingProduct } from './parking-product.model';
import { BaseModel, BaseModelDAO, _instance } from './base.model';
import { InnerJson } from '../../commons/core/innerJson';

export class SchedulingProduct extends BaseModel {

  id!: number;
  status!: TransactionType;
  value!: number;
  parkingProductId!: number;
  schedulingId!: number;

  scheduling: Scheduling;
  parkingProduct: ParkingProduct;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.status = Attributes.returnIfValid(json.status);
      this.value = Attributes.returnIfValid(json.value);
      this.parkingProductId = Attributes.returnIfValid(json.parkingProductId);
      this.schedulingId = Attributes.returnIfValid(json.schedulingId);
      this.parkingProduct = Attributes.returnIfValid(json.parkingProduct);
      this.scheduling = Attributes.returnIfValid(json.sheduling);
    }
  }
}

export class SchedulingProductDAO extends BaseModelDAO { }

SchedulingProductDAO.init({
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