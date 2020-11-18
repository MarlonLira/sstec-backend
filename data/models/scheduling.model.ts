import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, _instance } from './base.model';

export class Scheduling extends BaseModel {

  id!: number;
  status!: TransactionType;
  userName!: string;
  cardNumber!: string;
  vehiclePlate!: string;
  vehicleType!: string;
  value!: number;
  date!: Date;
  avaliableTime!: string;
  unavailableTime!: string;
  userId!: number;
  cardId!: number;
  vehicleId!: number;
  parkingId!: number;
  parkingSpaceId!: number;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.status = Attributes.returnIfValid(json.status);
      this.userName = Attributes.returnIfValid(json.userName);
      this.cardNumber = Attributes.returnIfValid(json.cardNumber);
      this.vehiclePlate = Attributes.returnIfValid(json.vehiclePlate);
      this.vehicleType = Attributes.returnIfValid(json.vehicleType);
      this.value = Attributes.returnIfValid(json.value);
      this.date = Attributes.returnIfValid(json.date);
      this.avaliableTime = Attributes.returnIfValid(json.avaliableTime);
      this.unavailableTime = Attributes.returnIfValid(json.unavailableTime);
      this.userId = Attributes.returnIfValid(json.userId);
      this.vehicleId = Attributes.returnIfValid(json.vehicleId);
      this.cardId = Attributes.returnIfValid(json.cardId);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
      this.parkingSpaceId = Attributes.returnIfValid(json.parkingSpaceId);
    }
  }

  ToAny() {
    return this.toJSON();
  }
}

Scheduling.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  userName: {
    type: new DataTypes.STRING(30)
  },
  cardNumber: {
    type: new DataTypes.STRING(100)
  },
  vehiclePlate: {
    type: new DataTypes.STRING(10)
  },
  vehicleType: {
    type: new DataTypes.STRING(10)
  },
  value: {
    type: new DataTypes.INTEGER()
  },
  date: {
    type: new DataTypes.DATEONLY()
  },
  avaliableTime: {
    type: DataTypes.TIME
  },
  unavailableTime: {
    type: DataTypes.TIME
  },
  userId: {
    type: new DataTypes.INTEGER()
  },
  cardId: {
    type: new DataTypes.INTEGER()
  },
  vehicleId: {
    type: new DataTypes.INTEGER()
  },
  parkingId: {
    type: new DataTypes.INTEGER()
  },
  parkingSpaceId: {
    type: new DataTypes.INTEGER()
  }
}, {
  sequelize: _instance,
  tableName: 'Scheduling'
});