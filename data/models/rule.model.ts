import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Marlon Lira
 * @class Rule
 * @extends {Model}
 */
export class Rule extends Model {
  id!: number
  status!: TransactionType
  name!: string
  level!: number

  /**
   * Creates an instance of Rule.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof Rule
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.level = Attributes.ReturnIfValid(json.level);
  }
  ToModify() {
    return this.toJSON();
  }
}

Rule.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Rule'
});