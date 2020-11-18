import { DataTypes } from 'sequelize';

import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, _instance } from './base.model';

export class ParkingSpace extends BaseModel {
  id!: number;
  status!: TransactionType;
  amount!: number;
  value: number;
  type: 'CAR' | 'MOTORCYCLE' | 'BOTH'
  parkingId!: number;

  constructor(json?: any) {
    super(json)
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.status = Attributes.returnIfValid(json.status);
      this.value = Attributes.returnIfValid(json.value);
      this.type = Attributes.returnIfValid(json.type);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
      this.amount = Attributes.returnIfValid(json.amount);
    }
  }

  ToAny() {
    return this.toJSON();
  }
}

ParkingSpace.init({
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
    type: new DataTypes.DOUBLE(),
    allowNull: false
  },
  type: {
    type: new DataTypes.STRING(10),
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