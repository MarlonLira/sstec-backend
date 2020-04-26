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
  value!: number;
  avaliableTime!: Date;
  unavailableTime!: Date;
  userId!: number;
  cardId!: number;
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
    this.value = Attributes.ReturnIfValid(json.value);
    this.avaliableTime = Attributes.ReturnIfValid(json.avaliableTime);
    this.unavailableTime = Attributes.ReturnIfValid(json.unavailableTime);
    this.userId = Attributes.ReturnIfValid(json.userId);
    this.cardId = Attributes.ReturnIfValid(json.cardId);
    this.parkingSpaceId = Attributes.ReturnIfValid(json.parkingSpaceId);
  }
  ToModify(){
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
  value: {
    type: new DataTypes.INTEGER()
  },
  avaliableTime: {
    type: new DataTypes.DATE()
  },
  unavailableTime: {
    type: new DataTypes.DATE()
  },
  userId: {
    type: new DataTypes.INTEGER(),
    allowNull: true
  },
  cardId: {
    type: new DataTypes.INTEGER(),
    allowNull: true
  },
  parkingSpaceId: {
    type: new DataTypes.INTEGER(),
    allowNull: true
  }
}, {
  sequelize: _instance,
  tableName: 'Scheduling'
});

export default Scheduling;