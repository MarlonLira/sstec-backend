import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';

import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/helpers';
import User from './user';

var _instance = new DbInstance().getInstance();

/**
 * @description
 * @author Gustavo Gusmão
 * @class Card
 * @extends {Model}
 */
class Card extends Model {

  id!: number;
  status: string;
  holder: string;
  number: number;
  secureCode: number;
  type: string;
  users!: BelongsToGetAssociationMixin<User>;

  /**
   *Creates an instance of Card.
   * @author Gustavo Gusmão
   * @param {*} [json]
   * @memberof Card
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.holder = Attributes.ReturnIfValid(json.country);
    this.number = Attributes.ReturnIfValid(json.state);
    this.secureCode = Attributes.ReturnIfValid(json.city);
    this.type = Attributes.ReturnIfValid(json.street);
  }
}

Card.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.CHAR(2),
    allowNull: false
  },
  holder: {
    type: new DataTypes.STRING(15),
    allowNull: false
  },
  number: {
    type: new DataTypes.INTEGER,
    allowNull: false
  },
  secureCode: {
    type: new DataTypes.STRING(20),
    allowNull: false
  },
  type: {
    type: new DataTypes.STRING(10),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Card'
});

export default Card;