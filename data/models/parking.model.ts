import { DataTypes } from 'sequelize';

import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { ParkingAddress } from './parking-address.model';
import { Company } from './company.model';
import { ParkingFile } from './parking-file.model';
import { Employee } from './employee.model';
import { BaseModel, BaseModelDAO, _instance } from './base.model';

export class Parking extends BaseModel {
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
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.status = Attributes.returnIfValid(json.status);
      this.name = Attributes.returnIfValid(json.name);
      this.registryCode = Attributes.returnIfValid(json.registryCode);
      this.phone = Attributes.returnIfValid(json.phone);
      this.email = Attributes.returnIfValid(json.email);
      this.companyId = Attributes.returnIfValid(json.companyId);
      this.address = Attributes.returnIfValid(json.address);
      this.company = Attributes.returnIfValid(json.company);
      this.files = Attributes.returnIfValid(json.files);
      this.qrcode = Attributes.returnIfValid(json.qrcode);
    }
  }
}

export class ParkingDAO extends BaseModelDAO { }

ParkingDAO.init({
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