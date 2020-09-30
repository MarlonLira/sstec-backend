import { Model, DataTypes } from 'sequelize';
import Attributes from '../../commons/core/attributes';
import Context from '../../main/context';

const _instance = Context.getInstance();

export class RouteSecurity extends Model {
  id: number;
  route: string;
  ruleId!: number;
  companyId: number;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.route = Attributes.ReturnIfValid(json.route);
    this.ruleId = Attributes.ReturnIfValid(json.ruleId);
    this.companyId = Attributes.ReturnIfValid(json.companyId);
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