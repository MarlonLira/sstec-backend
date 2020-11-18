import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, _instance } from './base.model';

export class CompanyAddress extends BaseModel {

  id!: number;
  status!: TransactionType;
  country!: string;
  state!: string;
  city!: string;
  district!: string;
  street!: string;
  number: number;
  zipCode: string;
  complement!: string;
  companyId!: number;

  constructor(json?: any) {
    super()
    this.id = Attributes.returnIfValid(json.id);
    this.status = Attributes.returnIfValid(json.status);
    this.country = Attributes.returnIfValid(json.country);
    this.state = Attributes.returnIfValid(json.state);
    this.city = Attributes.returnIfValid(json.city);
    this.district = Attributes.returnIfValid(json.district);
    this.street = Attributes.returnIfValid(json.street);
    this.number = Attributes.returnIfValid(json.number);
    this.zipCode = Attributes.returnIfValid(json.zipCode);
    this.complement = Attributes.returnIfValid(json.complement);
    this.companyId = Attributes.returnIfValid(json.companyId);
  }
  ToAny() {
    return this.toJSON();
  }
}

CompanyAddress.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  country: {
    type: new DataTypes.STRING(15)
  },
  state: {
    type: new DataTypes.STRING(30)
  },
  city: {
    type: new DataTypes.STRING(30)
  },
  district: {
    type: new DataTypes.STRING(30)
  },
  street: {
    type: new DataTypes.STRING(50)
  },
  number: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  zipCode: {
    type: new DataTypes.STRING(20),
    allowNull: false
  },
  complement: {
    type: new DataTypes.STRING(10)
  },
  companyId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'CompanyAddress'
});