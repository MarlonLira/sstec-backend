import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Gustavo Gusmão
 * @class Card
 * @extends {Model}
 */
class Card extends Model {

  id!: number;
  status!: TransactionType;
  holder: string;
  flag: string;
  number: string;
  expirationDate: string;
  secureCode!: string;
  type: string;
  userId: number;

  /**
   * Creates an instance of Card.
   * @author Gustavo Gusmão
   * @param {*} [json]
   * @memberof Card
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.holder = Attributes.ReturnIfValid(json.holder);
    this.flag = Attributes.ReturnIfValid(json.flag);
    this.number = Attributes.ReturnIfValid(json.number);
    this.expirationDate = Attributes.ReturnIfValid(json.expirationDate);
    this.secureCode = Attributes.ReturnIfValid(json.secureCode);
    this.type = Attributes.ReturnIfValid(json.type);
    this.userId = Attributes.ReturnIfValid(json.userId);
  }
  ToModify(){
    return this.toJSON();
  }
}

Card.init({
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
  holder: {
    type: new DataTypes.STRING(40),
    allowNull: false
  },
  flag: {
    type: new DataTypes.STRING(20),
    allowNull: false
  },
  number: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  expirationDate: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  secureCode: {
    type: new DataTypes.STRING(100),
  },
  type: {
    type: new DataTypes.STRING(6),
    allowNull: false
  },
  userId:{
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Card'
});

export default Card;