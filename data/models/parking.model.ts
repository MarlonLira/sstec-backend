import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { ParkingAddress } from './parking-address.model';
import { Company } from './company.model';
import { ParkingFile } from './parking-file.model';
import { Employee } from './employee.model';

const _instance = Context.getInstance();

export class Parking extends Model {
  id!: number;
  status!: TransactionType;
  name: string;
  registryCode: string;
  phone: string;
  email: string;
  amount: number;
  companyId: number;

  address: ParkingAddress;
  company: Company;
  employees: Employee[];
  files: ParkingFile[];
  qrcode: string;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.name = Attributes.ReturnIfValid(json.name);
    this.registryCode = Attributes.ReturnIfValid(json.registryCode);
    this.phone = Attributes.ReturnIfValid(json.phone);
    this.email = Attributes.ReturnIfValid(json.email);
    this.companyId = Attributes.ReturnIfValid(json.companyId);
    this.address = Attributes.ReturnIfValid(json.address);
    this.company = Attributes.ReturnIfValid(json.company);
    this.files = Attributes.ReturnIfValid(json.files);
    this.qrcode = Attributes.ReturnIfValid(json.qrcode);
  }

  ToAny() {
    const obj: any = this.toJSON();
    obj.address = this.address;
    return obj;
  }
}

Parking.init({
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
    type: new DataTypes.INTEGER()
  },
  companyId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  qrcode: {
    type: new DataTypes.STRING(255),
  }
}, {
  sequelize: _instance,
  tableName: 'Parking'
});