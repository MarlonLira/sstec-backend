import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

export class ParkingAddress extends Model {
  id!: number;
  status!: TransactionType;
  country!: string;
  state!: string;
  city!: string;
  district!: string;
  street!: string;
  number: number;
  zipCode!: string;
  latitude: string;
  longitude: string;
  complement: string;
  parkingId!: number;

  /**
   * Creates an instance of ParkingAddress.
   * @author Felipe Seabra
   * @param {*} [json]
   * @memberof ParkingAddress
   */
  constructor(json?: any) {
    super();
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.country = Attributes.ReturnIfValid(json.country);
    this.state = Attributes.ReturnIfValid(json.state);
    this.city = Attributes.ReturnIfValid(json.city);
    this.district = Attributes.ReturnIfValid(json.district);
    this.street = Attributes.ReturnIfValid(json.street);
    this.number = Attributes.ReturnIfValid(json.number);
    this.zipCode = Attributes.ReturnIfValid(json.zipCode);
    this.latitude = Attributes.ReturnIfValid(json.latitude);
    this.longitude = Attributes.ReturnIfValid(json.longitude);
    this.complement = Attributes.ReturnIfValid(json.complement);
    this.parkingId = Attributes.ReturnIfValid(json.parkingId);
  }

  ToModify() {
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
    type: new DataTypes.STRING(30),
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
    type: new DataTypes.STRING(10),
  },
  longitude: {
    type: new DataTypes.STRING(10),
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