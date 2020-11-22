import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { BaseModel, _instance } from './base.model';

export class ParkingPrice extends BaseModel {

  public id!: number;
  public status!: string;
  public period!: 'OVERTIME' | 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  public value!: number;
  public vehicleType!: 'CAR' | 'MOTORCYCLE' | 'BOTH';
  public unit!: number;
  public parkingId!: number;

  constructor(json?: any) {
    super(json)
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.status = Attributes.returnIfValid(json.status);
      this.period = Attributes.returnIfValid(json.period);
      this.value = Attributes.returnIfValid(json.value);
      this.vehicleType = Attributes.returnIfValid(json.vehicleType);
      this.unit = Attributes.returnIfValid(json.unit);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
    }
  }

  ToAny() {
    return this.toJSON();
  }
}

ParkingPrice.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  period: {
    type: new DataTypes.STRING(10),
    allowNull: false
  },
  value: {
    type: new DataTypes.DOUBLE(),
    allowNull: false
  },
  vehicleType: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  unit: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  parkingId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
},
  {
    sequelize: _instance,
    tableName: 'PakingPrice'
  });