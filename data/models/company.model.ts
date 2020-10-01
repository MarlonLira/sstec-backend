import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { CompanyAddress } from './company-address.model';

const _instance = Context.getInstance();

export class Company extends Model {

  id!: number;
  status!: TransactionType;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!: string;
  about: string;
  image: any;

  address: CompanyAddress;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.phone = Attributes.ReturnIfValid(json.phone);
    this.email = Attributes.ReturnIfValid(json.email);
    this.about = Attributes.ReturnIfValid(json.about);
    this.image = Attributes.ReturnIfValid(json.image);
    this.address = Attributes.ReturnIfValid(json.address);
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
  email: {
    type: new DataTypes.STRING(50),
    validate: { isEmail: true }
  },
  phone: {
    type: new DataTypes.STRING(12)
  },
  about: {
    type: new DataTypes.STRING(255)
  },
  image: {
    type: new DataTypes.BLOB("medium"),
    get() {
      return this.getDataValue('image') ? this.getDataValue('image').toString('base64') : undefined;
    }
  }
}, {
  sequelize: _instance,
  tableName: 'Company'
});