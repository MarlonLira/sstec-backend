import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { InnerJson } from '../../commons/core/innerJson';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, BaseModelDAO, _instance } from './base.model';

export class ParkingFinance extends BaseModel {
  id!: number;
  month!: string;
  year!: string;
  value!: number;
  parkingId!: number;
  companyId!: number;
  status!: TransactionType;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.month = Attributes.returnIfValid(json.month);
      this.year = Attributes.returnIfValid(json.year);
      this.value = Attributes.returnIfValid(json.value);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
      this.companyId = Attributes.returnIfValid(json.companyId);
      this.status = Attributes.returnIfValid(json.status);
    }
  }
}

export class ParkingFinanceDAO extends BaseModelDAO { }

ParkingFinanceDAO.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  month: {
    type: new DataTypes.STRING(10),
    allowNull: false
  },
  year: {
    type: new DataTypes.STRING(4),
    allowNull: false
  },
  value: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  parkingId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  companyId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  }
},
  {
    sequelize: _instance,
    tableName: 'ParkingFinance'
  });