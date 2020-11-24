import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { InnerJson } from '../../commons/core/innerJson';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, BaseModelDAO, _instance } from './base.model';
import { Parking } from './parking.model';

export class ParkingProduct extends BaseModel {
  id!: number;
  status!: TransactionType;
  name!: string;
  description!: string;
  value: number;
  parkingId!: number;

  parking: Parking;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json)
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.status = Attributes.returnIfValid(json.status);
      this.name = Attributes.returnIfValid(json.name);
      this.description = Attributes.returnIfValid(json.description);
      this.value = Attributes.returnIfValid(json.value);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
      this.parking = Attributes.returnIfValid(json.parking);
    }
  }
}

export class ParkingProductDAO extends BaseModelDAO { }

ParkingProductDAO.init({
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
    type: new DataTypes.STRING(20),
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
  tableName: 'ParkingProduct'
});