import { Model, DataTypes } from 'sequelize';

import { DbInstance } from '../../main/context';
import Attributes from '../../commons/core/attributes';

var _instance = DbInstance.getInstance();

/**
 * @description
 * @author Marlon Lira
 * @class Rule
 * @extends {Model}
 */
class Rule extends Model {
  id!: number
  status!: string
  name!: string
  level!: number

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.level = Attributes.ReturnIfValid(json.level);
  }
}

Rule.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: DataTypes.CHAR(2),
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

export default Rule;