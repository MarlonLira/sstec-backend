import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { BaseModel, _instance } from './base.model';
import { Company } from './company.model';
import { Rule } from './rule.model';

export class RouteSecurity extends BaseModel {
  id: number;
  route: string;
  ruleId!: number;
  companyId: number;

  rule: Rule;
  company: Company;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.route = Attributes.returnIfValid(json.route);
      this.ruleId = Attributes.returnIfValid(json.ruleId);
      this.companyId = Attributes.returnIfValid(json.companyId);
      this.rule = Attributes.returnIfValid(json.rule);
      this.company = Attributes.returnIfValid(json.company);
    }
  }

  ToAny() {
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