import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { InnerJson } from '../../commons/core/innerJson';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, BaseModelDAO, _instance } from './base.model';

export class Rule extends BaseModel {
  id!: number
  status!: TransactionType
  name!: string
  level!: number

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json)
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.name = Attributes.returnIfValid(json.name);
      this.status = Attributes.returnIfValid(json.status);
      this.level = Attributes.returnIfValid(json.level);
    }
  }
}

export class RuleDAO extends BaseModelDAO { }

RuleDAO.init({
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