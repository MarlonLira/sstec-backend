import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Emerson Souza
 * @class ParkingScore
 * @extends {Model}
 */
class ParkingScore extends Model {
  id!: number;
  attendanceScore: number;
  securitySocre: number;
  locationSocre: number;
  userId: number;
  parkingId!: number;

  /**
   *Creates an instance of ParkingScore.
   * @author Emerson Souza
   * @param {*} [json]
   * @memberof ParkingScore
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.attendanceScore = Attributes.ReturnIfValid(json.attendanceScore);
    this.securitySocre = Attributes.ReturnIfValid(json.securitySocre);
    this.locationSocre = Attributes.ReturnIfValid(json.locationSocre);
    this.userId = Attributes.ReturnIfValid(json.userId);
    this.parkingId = Attributes.ReturnIfValid(json.parkingId);
  }
  ToModify() {
    return this.toJSON();
  }
}

ParkingScore.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  attendanceScore: {
    type: new DataTypes.DOUBLE(),
    allowNull: false
  },
  securitySocre: {
    type: new DataTypes.DOUBLE(),
    allowNull: false
  },
  locationSocre: {
    type: new DataTypes.DOUBLE(),
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

export default ParkingScore;