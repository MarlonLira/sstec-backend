import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Gustavo Gusmão
 * @class Company
 */
class Company extends Model {

  id!: number;
  status!: TransactionType;
  name!: string;
  registryCode!: string;
  phone!: string;

  /**
   * Creates an instance of Company.
   * @author Gustavo Gusmão
   * @param {*} [json]
   * @memberof Company
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.phone = Attributes.ReturnIfValid(json.phone);
  }
}

// Todos os atributos que não podem ser nulos no banco tem que ter 'allowNull: false'
Company.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
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
  phone: {
    type: new DataTypes.STRING(12)
  }
}, {
  sequelize: _instance,
  tableName: 'Company'
});

export default Company;