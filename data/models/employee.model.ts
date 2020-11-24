import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { Rule } from './rule.model';
import { Parking } from './parking.model';
import { Company } from './company.model';
import { AccountRecovery } from './account-recovery.model';
import { BaseModel, BaseModelDAO, _instance } from './base.model';
import { InnerJson } from '../../commons/core/innerJson';

export class Employee extends BaseModel {
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
  public company: Company;
  public accountsRecovery: AccountRecovery[];

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.name = Attributes.returnIfValid(json.name);
      this.status = Attributes.returnIfValid(json.status);
      this.registryCode = Attributes.returnIfValid(json.registryCode);
      this.password = Attributes.returnIfValid(json.password);
      this.phone = Attributes.returnIfValid(json.phone);
      this.email = Attributes.returnIfValid(json.email);
      this.about = Attributes.returnIfValid(json.about);
      this.image = Attributes.returnIfValid(json.image);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
      this.parking = Attributes.returnIfValid(json.parking);
      this.companyId = Attributes.returnIfValid(json.companyId);
      this.company = Attributes.returnIfValid(json.company);
      this.ruleId = Attributes.returnIfValid(json.ruleId);
      this.rule = Attributes.returnIfValid(json.rule);
      this.accountsRecovery = Attributes.returnIfValid(json.accountsRecovery);
    }
  }
}

export class EmployeeDAO extends BaseModelDAO { }

EmployeeDAO.init({
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
  image: {
    type: new DataTypes.BLOB("medium"),
    get() {
      return this.getDataValue('image') ? this.getDataValue('image').toString('base64') : undefined;
    }
  }
}, {
  sequelize: _instance,
  tableName: 'Employee'
});