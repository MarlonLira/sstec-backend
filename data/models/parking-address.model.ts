import { DataTypes } from 'sequelize';

import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, _instance } from './base.model';

export class ParkingAddress extends BaseModel {
  id!: number;
  status!: TransactionType;
  country!: string;
  state!: string;
  city!: string;
  district!: string;
  street!: string;
  number: number;
  zipCode!: string;
  latitude: number;
  longitude: number;
  complement: string;
  parkingId!: number;

  constructor(json?: any) {
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
      this.latitude = Attributes.returnIfValid(json.latitude);
      this.longitude = Attributes.returnIfValid(json.longitude);
      this.complement = Attributes.returnIfValid(json.complement);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
    }
  }

  ToAny() {
    return this.toJSON();
  }
}

ParkingAddress.init({
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
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  state: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  city: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  district: {
    type: new DataTypes.STRING(30)
  },
  street: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  number: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  zipCode: {
    type: new DataTypes.STRING(8),
    allowNull: false
  },
  latitude: {
    type: new DataTypes.DOUBLE,
  },
  longitude: {
    type: new DataTypes.DOUBLE,
  },
  complement: {
    type: new DataTypes.STRING(40)
  },
  parkingId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
},
  {
    sequelize: _instance,
    tableName: 'ParkingAddress'
  });