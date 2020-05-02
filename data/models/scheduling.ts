import { Model, DataTypes, INTEGER } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Gustavo Gusmão
 * @class Scheduling
 */
class Scheduling extends Model {

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
  parkingSpaceId!: number;

  /**
   * Creates an instance of Scheduling.
   * @author Gustavo Gusmão
   * @param {*} [json]
   * @memberof Scheduling
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.userName = Attributes.ReturnIfValid(json.userName);
    this.cardNumber = Attributes.ReturnIfValid(json.cardNumber);
    this.vehiclePlate = Attributes.ReturnIfValid(json.vehiclePlate);
    this.vehicleType = Attributes.ReturnIfValid(json.vehicleType);
    this.value = Attributes.ReturnIfValid(json.value);
    this.date = Attributes.ReturnIfValid(json.date);
    this.avaliableTime = Attributes.ReturnIfValid(json.avaliableTime);
    this.unavailableTime = Attributes.ReturnIfValid(json.unavailableTime);
    this.userId = Attributes.ReturnIfValid(json.userId);
    this.vehicleId = Attributes.ReturnIfValid(json.vehicleId);
    this.cardId = Attributes.ReturnIfValid(json.cardId);
    this.parkingSpaceId = Attributes.ReturnIfValid(json.parkingSpaceId);
  }

  ToModify() {
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
  parkingSpaceId: {
    type: new DataTypes.INTEGER()
  }
}, {
  sequelize: _instance,
  tableName: 'Scheduling'
});

export default Scheduling;