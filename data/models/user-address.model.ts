import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { InnerJson } from '../../commons/core/innerJson';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, BaseModelDAO, _instance } from './base.model';

export class UserAddress extends BaseModel {

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
  userId!: number;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
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
      this.userId = Attributes.returnIfValid(json.userId);
    }
  }
}

export class UserAddressDAO extends BaseModelDAO { }

UserAddressDAO.init({
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
  userId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'UserAddress'
});