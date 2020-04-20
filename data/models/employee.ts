import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Marlon Lira
 * @class Employee
 * @extends {Model}
 */
class Employee extends Model {
  public id!: number;
  public status!: TransactionType;
  public name!: string;
  public registryCode!: string;
  public email!: string;
  public password: string;
  public companyId!: number;
  public ruleId!: number;

  /**
   * Creates an instance of Employee.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof Employee
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.password = Attributes.ReturnIfValid(json.password);
    this.email = Attributes.ReturnIfValid(json.email);
    this.companyId = Attributes.ReturnIfValid(json.companyId);
    this.ruleId = Attributes.ReturnIfValid(json.ruleId);
  }

  ToModify() {
    return this.toJSON();
  }
}

Employee.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.ENUM(),
    allowNull: true,
    values: ['AT', 'PD', 'EX']
  },
  name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  registryCode: {
    type: new DataTypes.STRING(14),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(100)
  },
  email: {
    type: new DataTypes.STRING(50),
    validate: { isEmail: true }
  },
  companyId: {
    type: new DataTypes.INTEGER()
  },
  ruleId: {
    type: new DataTypes.INTEGER()
  }
}, {
  sequelize: _instance,
  tableName: 'Employee',
});

export default Employee;