import { Model, DataTypes} from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Marlon Lira
 * @class User
 * @extends {Model}
 */
class User extends Model {

  id!: number;
  status!: TransactionType;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!: string;
  password!: string;

  /**
   * Creates an instance of User.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof User
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.phone = Attributes.ReturnIfValid(json.phone);
    this.email = Attributes.ReturnIfValid(json.email);
    this.password = Attributes.ReturnIfValid(json.password);
  }
  
  ToModify(){
    return this.toJSON();
  }
}

User.init({
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
    type: new DataTypes.STRING(12),
    allowNull: false
  },
  phone: {
    type: new DataTypes.STRING(12)
  },
  email: {
    type: new DataTypes.STRING(50),
    validate: { isEmail: true }
  },
  password: {
    type: new DataTypes.STRING(100)
  }
}, {
  sequelize: _instance,
  tableName: 'User'
});

export default User;