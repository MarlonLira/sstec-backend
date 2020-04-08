import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/helpers';

var _instance = DbInstance.getInstance()

/**
 * @description
 * @author Emerson Souza
 * @class Payment
 * @extends {Model}
 */
class Payment extends Model {
  id!: number;
  status: string;
  value: number;

  /**
   *Creates an instance of Payment.
   * @author Emerson Souza
   * @param {*} [json]
   * @memberof Payment
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.value = Attributes.ReturnIfValid(json.value);
  }
}

Payment.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.CHAR(2),
    allowNull: false
  },
  value: {
    type: new DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Payment'
});

export default Payment;