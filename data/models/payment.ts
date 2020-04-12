import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../../main/context';
import Attributes from '../../commons/core/attributes';

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
  cardId: number;
  parkingSpaceId: number;

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
    this.cardId = Attributes.ReturnIfValid(json.cardId);
    this.parkingSpaceId = Attributes.ReturnIfValid(json.parkingSpaceId);
  }
}

Payment.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.ENUM,
    allowNull: true,
    values: ['AT', 'PD', 'EX']
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