import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';

const _instance = Context.getInstance();


/**
 * @description
 * @author Felipe Seabra
 * @class ParkingAdress
 * @extends {Model}
 */
class ParkingAdress extends Model {
  id!: number;
  status!: string;
  country!: string;
  state!: string;
  city!: string;
  street!: string;
  number: number;
  zipCode!: string;
  latitude: string;
  longitude: string;
  complement: string;
  parkingId!: number;

  /**
   * Creates an instance of ParkingAdress.
   * @author Felipe Seabra
   * @param {*} [json]
   * @memberof ParkingAdress
   */
  constructor(json?: any) {
    super();
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.country = Attributes.ReturnIfValid(json.country);
    this.state = Attributes.ReturnIfValid(json.state);
    this.city = Attributes.ReturnIfValid(json.city);
    this.street = Attributes.ReturnIfValid(json.street);
    this.number = Attributes.ReturnIfValid(json.number);
    this.zipCode = Attributes.ReturnIfValid(json.zipCode);
    this.latitude = Attributes.ReturnIfValid(json.latitude);
    this.longitude = Attributes.ReturnIfValid(json.longitude);
    this.complement = Attributes.ReturnIfValid(json.complement);
    this.parkingId = Attributes.ReturnIfValid(json.parkingId);
  }
}

ParkingAdress.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.ENUM(),
    allowNull: true,
    values: ['AT', 'PD', 'EX']
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
    type: new DataTypes.STRING(5),
    allowNull: false
  },
  longitude: {
    type: new DataTypes.STRING(5),
    allowNull: false
  },
  complement: {
    type: new DataTypes.STRING(40),
    allowNull: false
  },
  parkingId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
},
{
  sequelize: _instance,
  tableName: 'ParkingAdress'
});

export default ParkingAdress;