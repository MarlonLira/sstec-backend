import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { CompanyAddress } from './company-address.model';
import { Parking } from './parking.model';
import { RouteSecurity } from './route-security.model';
import { BaseModel, BaseModelDAO, _instance } from './base.model';
import { InnerJson } from '../../commons/core/innerJson';

export class Company extends BaseModel {

  id!: number;
  status!: TransactionType;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!: string;
  about: string;
  image: any;

  address: CompanyAddress;
  parkings: Parking[];
  routeSecurity: RouteSecurity[];

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.name = Attributes.returnIfValid(json.name);
      this.status = Attributes.returnIfValid(json.status);
      this.registryCode = Attributes.returnIfValid(json.registryCode);
      this.phone = Attributes.returnIfValid(json.phone);
      this.email = Attributes.returnIfValid(json.email);
      this.about = Attributes.returnIfValid(json.about);
      this.image = Attributes.returnIfValid(json.image);
      this.address = Attributes.returnIfValid(json.address);
    }
  }
}

export class CompanyDAO extends BaseModelDAO { }

CompanyDAO.init({
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