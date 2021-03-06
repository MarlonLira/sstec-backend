import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { InnerJson } from '../../commons/core/innerJson';
import { BaseModel, BaseModelDAO, _instance } from './base.model';

export class ParkingScore extends BaseModel {
  id!: number;
  attendanceScore: number;
  securityScore: number;
  locationScore: number;
  userId: number;
  parkingId!: number;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.attendanceScore = Attributes.returnIfValid(json.attendanceScore);
      this.securityScore = Attributes.returnIfValid(json.securityScore);
      this.locationScore = Attributes.returnIfValid(json.locationScore);
      this.userId = Attributes.returnIfValid(json.userId);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
    }
  }
}

export class ParkingScoreDAO extends BaseModelDAO { }

ParkingScoreDAO.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  attendanceScore: {
    type: new DataTypes.FLOAT(),
    allowNull: false
  },
  securityScore: {
    type: new DataTypes.FLOAT(),
    allowNull: false
  },
  locationScore: {
    type: new DataTypes.FLOAT(),
    allowNull: false
  },
  userId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  parkingId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'ParkingScore'
});