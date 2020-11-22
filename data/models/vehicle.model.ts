import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { InnerJson } from '../../commons/core/innerJson';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, BaseModelDAO, _instance } from './base.model';

export class Vehicle extends BaseModel {

  id!: number;
  status!: TransactionType;
  model!: string;
  color!: string;
  type!: string;
  licensePlate!: string;
  userId!: number;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.status = Attributes.returnIfValid(json.status);
      this.model = Attributes.returnIfValid(json.model);
      this.color = Attributes.returnIfValid(json.color);
      this.type = Attributes.returnIfValid(json.type);
      this.licensePlate = Attributes.returnIfValid(json.licensePlate);
      this.userId = Attributes.returnIfValid(json.userId);
    }
  }
}

export class VehicleDAO extends BaseModelDAO { }

VehicleDAO.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
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
    type: DataTypes.STRING(50),
    allowNull: false
  },
  licensePlate: {
    type: new DataTypes.STRING(10),
    allowNull: false
  },
  userId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Vehicle'
});