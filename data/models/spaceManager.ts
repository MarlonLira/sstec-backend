import { Model, DataTypes, TIME } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Gustavo Gusmão
 * @class SpaceManager
 */
class SpaceManager extends Model {

  id!: number;
  status!: TransactionType;
  from!: Date;
  to!: Date;
  unavailableTime!: Date;
  parkingSpaceId!: number;

  /**
   * Creates an instance of SpaceManager.
   * @author Gustavo Gusmão
   * @param {*} [json]
   * @memberof SpaceManager
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.from = Attributes.ReturnIfValid(json.from);
    this.to = Attributes.ReturnIfValid(json.to);
    this.unavailableTime = Attributes.ReturnIfValid(json.unavailableTime);
    this.parkingSpaceId = Attributes.ReturnIfValid(json.parkingSpaceId);
  }
  ToModify() {
    return this.toJSON();
  }
}

SpaceManager.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  from: {
    type: new DataTypes.DATE()
  },
  to: {
    type: new DataTypes.DATE()
  },
  unavailableTime: {
    type: DataTypes.TIME
  },
  parkingSpaceId: {
    type: new DataTypes.INTEGER(),
    allowNull: true
  }
}, {
  sequelize: _instance,
  tableName: 'SpaceManager'
});

export default SpaceManager;