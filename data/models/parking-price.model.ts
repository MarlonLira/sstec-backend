import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';


const _instance = Context.getInstance();

export class ParkingPrice extends Model {

  public id!: number;
  public status!: string;
  public period!: string;
  public value!: number;
  public vehicleType!: string;
  public unit!: number;
  public parkingId!: number;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.period = Attributes.ReturnIfValid(json.period);
    this.value = Attributes.ReturnIfValid(json.value);
    this.vehicleType = Attributes.ReturnIfValid(json.vehicleType);
    this.unit = Attributes.ReturnIfValid(json.unit);
    this.parkingId = Attributes.ReturnIfValid(json.parkingId);
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
    type: new DataTypes.INTEGER(),
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