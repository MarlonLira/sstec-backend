import { Model, DataTypes } from 'sequelize';
import Attributes from '../../commons/core/attributes';
import Context from '../../main/context';
import { Company } from './company.model';
import { Rule } from './rule.model';

const _instance = Context.getInstance();

export class RouteSecurity extends Model {
  id: number;
  route: string;
  ruleId!: number;
  companyId: number;

  rule: Rule;
  company: Company;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.route = Attributes.ReturnIfValid(json.route);
    this.ruleId = Attributes.ReturnIfValid(json.ruleId);
    this.companyId = Attributes.ReturnIfValid(json.companyId);
    this.rule = Attributes.ReturnIfValid(json.rule);
    this.company = Attributes.ReturnIfValid(json.company);
  }

  ToModify() {
    return this.toJSON();
  }
}
RouteSecurity.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  route: {
    type: new DataTypes.STRING(50),
    allowNull: false
  },
  ruleId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  companyId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'RouteSecurity'
});