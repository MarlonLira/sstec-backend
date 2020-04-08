import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/helpers';

var _instance = DbInstance.getInstance()

/**
 * @description
 * @author Gustavo Gusmão
 * @class Company
 */
class Company extends Model {

  id!: number;
  status: string;
  name: string;
  registryCode!: string;
  phone!: string;
  email!: string;

  /**
   *Creates an instance of Company.
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
    this.email = Attributes.ReturnIfValid(json.email);
  }
}

Company.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.CHAR(2),
    allowNull: false
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
  },
  email: {
    type: new DataTypes.STRING(50)
  }
}, {
  sequelize: _instance,
  tableName: 'Company',
  scopes: {
    public: {
      attributes: ['id', 'name', 'phone', 'email', 'registryCode']
    }
  }
});

export default Company;