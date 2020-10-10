import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { Rule } from './rule.model';
import { Parking } from './parking.model';

const _instance = Context.getInstance();

export class Employee extends Model {
  public id!: number;
  public status!: TransactionType;
  public name!: string;
  public registryCode!: string;
  public phone!: string;
  public email!: string;
  public password: string;
  public about: string;
  public image: any;
  public parkingId!: number;
  public companyId!: number;
  public ruleId!: number;

  public rule: Rule;
  public parking: Parking;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.name = Attributes.ReturnIfValid(json.name);
    this.status = Attributes.ReturnIfValid(json.status);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.password = Attributes.ReturnIfValid(json.password);
    this.phone = Attributes.ReturnIfValid(json.phone);
    this.email = Attributes.ReturnIfValid(json.email);
    this.about = Attributes.ReturnIfValid(json.about);
    this.image = Attributes.ReturnIfValid(json.image);
    this.parkingId = Attributes.ReturnIfValid(json.parkingId);
    this.parking = Attributes.ReturnIfValid(json.parking);
    this.companyId = Attributes.ReturnIfValid(json.companyId);
    this.ruleId = Attributes.ReturnIfValid(json.ruleId);
    this.rule = Attributes.ReturnIfValid(json.rule);
  }

  ToAny() {
    return this.toJSON();
  }
}

Employee.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
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
  password: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: new DataTypes.STRING(14)
  },
  email: {
    type: new DataTypes.STRING(50),
    validate: { isEmail: true },
    allowNull: false
  },
  about: {
    type: new DataTypes.STRING(255),
  },
  parkingId: {
    type: new DataTypes.INTEGER()
  },
  companyId: {
    type: new DataTypes.INTEGER()
  },
  ruleId: {
    type: new DataTypes.INTEGER()
  },
  image:{
    type: new DataTypes.BLOB("medium"),
    get() {
      return this.getDataValue('image') ? this.getDataValue('image').toString('base64') : undefined;
    }
  }
}, {
  sequelize: _instance,
  tableName: 'Employee'
});