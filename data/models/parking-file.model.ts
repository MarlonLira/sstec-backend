import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { InnerJson } from '../../commons/core/innerJson';
import { BaseModel, BaseModelDAO, _instance } from './base.model';

export class ParkingFile extends BaseModel {
  id: number;
  name: string;
  encoded: any;
  type: string;
  parkingId: number;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.name = Attributes.returnIfValid(json.name);
      this.encoded = Attributes.returnIfValid(json.encoded);
      this.type = Attributes.returnIfValid(json.type);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
    }
  }
}

export class ParkingFileDAO extends BaseModelDAO { }

ParkingFileDAO.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  type: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  encoded: {
    type: new DataTypes.BLOB("medium"),
    get() {
      return this.getDataValue('encoded') ? this.getDataValue('encoded').toString('base64') : undefined;
    },
  },
  parkingId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'ParkingFile'
});