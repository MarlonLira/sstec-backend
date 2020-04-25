import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Gustavo Gusmão
 * @class CompanyAdress
 * @extends {Model}
 */
class CompanyAdress extends Model {

  id!: number;
  status!: TransactionType;
  country!: string;
  state!: string;
  city!: string;
  street!: string;
  number: number;
  zipCode: string;
  complement!: string;
  companyId!: number;

  /**
   * Creates an instance of CompanyAdress.
   * @author Gustavo Gusmão
   * @param {*} [json]
   * @memberof CompanyAdress
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.country = Attributes.ReturnIfValid(json.country);
    this.state = Attributes.ReturnIfValid(json.state);
    this.city = Attributes.ReturnIfValid(json.city);
    this.street = Attributes.ReturnIfValid(json.street);
    this.number = Attributes.ReturnIfValid(json.number);
    this.zipCode = Attributes.ReturnIfValid(json.zipCode);
    this.complement = Attributes.ReturnIfValid(json.complement);
    this.companyId = Attributes.ReturnIfValid(json.companyId);
  }
  ToModify() {
    return this.toJSON();
  }
}

CompanyAdress.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  country: {
    type: new DataTypes.STRING(15)
  },
  state: {
    type: new DataTypes.STRING(30)
  },
  city: {
    type: new DataTypes.STRING(30)
  },
  street: {
    type: new DataTypes.STRING(50)
  },
  number: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  zipCode: {
    type: new DataTypes.STRING(20),
    allowNull: false
  },
  complement: {
    type: new DataTypes.STRING(10)
  },
  companyId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'CompanyAdress'
});

export default CompanyAdress;