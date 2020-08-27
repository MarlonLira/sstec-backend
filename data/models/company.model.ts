import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { CompanyAdress } from './company-adress.model';

const _instance = Context.getInstance();

export class Company extends Model {

  id!: number;
  status!: TransactionType;
  name!: string;
  registryCode!: string;
  phone!: string;
  about: string;
  imageUrl: string;

  adress: CompanyAdress;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.phone = Attributes.ReturnIfValid(json.phone);
    this.about = Attributes.ReturnIfValid(json.about);
    this.imageUrl = Attributes.ReturnIfValid(json.imageurl);
    this.adress = Attributes.ReturnIfValid(json.adress);
  }

  ToModify() {
    return this.toJSON();
  }
}

Company.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: new DataTypes.STRING(2),
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
  about: {
    type: new DataTypes.STRING(255)
  },
  imageUrl: {
    type: new DataTypes.STRING(255)
  }
}, {
  sequelize: _instance,
  tableName: 'Company'
});