import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';

import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/helpers';

var _instance = new DbInstance().getInstance();

/**
 * @description
 * @author Marlon Lira
 * @class Vehicle
 * @extends {Model}
 */
class UserVehicles extends Model {

  userId!: number;
  vehicleId: number;

  /**
   *Creates an instance of Vehicle.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof Vehicle
   */
  constructor(json?: any) {
    super()
    this.userId = Attributes.ReturnIfValid(json.userId);
    this.vehicleId = Attributes.ReturnIfValid(json.vehicleId);
  }

}

UserVehicles.init({
  vehicleId: {
    type: new DataTypes.INTEGER,
    references: {
      model: 'Vehicle',
      key: 'id'
    }
  },
  userId: {
    type: new DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    }
  }
}, {
  sequelize: _instance,
  tableName: 'User_Vehicle'
});

export default UserVehicles;