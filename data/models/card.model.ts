import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { InnerJson } from '../../commons/core/innerJson';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, BaseModelDAO, _instance } from './base.model';

export class Card extends BaseModel {

  id!: number;
  status!: TransactionType;
  holder: string;
  flag: string;
  number: string;
  expirationDate: string;
  secureCode!: string;
  type: string;
  userId: number;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.status = Attributes.returnIfValid(json.status);
      this.holder = Attributes.returnIfValid(json.holder);
      this.flag = Attributes.returnIfValid(json.flag);
      this.number = Attributes.returnIfValid(json.number);
      this.expirationDate = Attributes.returnIfValid(json.expirationDate);
      this.secureCode = Attributes.returnIfValid(json.secureCode);
      this.type = Attributes.returnIfValid(json.type);
      this.userId = Attributes.returnIfValid(json.userId);
    }
  }
}

export class CardDAO extends BaseModelDAO { }

CardDAO.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
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
  userId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Card'
});