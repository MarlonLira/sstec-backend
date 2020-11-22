import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { InnerJson } from '../../commons/core/innerJson';
import { BaseModel, BaseModelDAO, _instance } from './base.model';

export class FavoriteParking extends BaseModel {

  id!: number;
  userId: number;
  parkingId: number;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.userId = Attributes.returnIfValid(json.userId);
      this.parkingId = Attributes.returnIfValid(json.parkingId);
    }
  }
}

export class FavoriteParkingDAO extends BaseModelDAO { }

FavoriteParkingDAO.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
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
  tableName: 'FavoriteParking'
});