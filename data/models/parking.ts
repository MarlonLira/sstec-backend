import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Emerson Souza
 * @class Parking
 * @extends {Model}
 */
class Parking extends Model {
  id!: number;
  status!: TransactionType;
  name: string;
  registryCode: string;
  phone: string;
  email: string;
  amount: number;
  imgUrl: string;
  companyId: number;

  /**
   * Creates an instance of Parking.
   * @author Emerson Souza
   * @param {*} [json]
   * @memberof Parking
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.name = Attributes.ReturnIfValid(json.name);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.phone = Attributes.ReturnIfValid(json.phone);
    this.email = Attributes.ReturnIfValid(json.email);
    this.amount = Attributes.ReturnIfValid(json.amount);
    this.imgUrl = Attributes.ReturnIfValid(json.imgUrl);
    this.companyId = Attributes.ReturnIfValid(json.companyId);
  }
  
  ToModify(){
    return this.toJSON();
  }
}

Parking.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.ENUM(),
    allowNull: false,
    values: ['AT', 'PD', 'EX']
  },
  name: {
    type: new DataTypes.STRING(30)
  },
  registryCode: {
    type: new DataTypes.STRING(14)
  },
  phone: {
    type: new DataTypes.STRING(12)
  },
  email: {
    type: new DataTypes.STRING(50),
    validate: { isEmail: true }
  },
  amount: {
    type: new DataTypes.DOUBLE()
  },
  imgUrl: {
    type: new DataTypes.STRING(100),
    validate: { isUrl: true }
  },
  companyId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Parking'
});

export default Parking;