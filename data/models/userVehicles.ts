import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';

import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/helpers';

var _instance = DbInstance.getInstance()


class UserVehicles extends Model {
  userId!: number;
  vehicleId: number;
}

UserVehicles.init({}, {
  sequelize: _instance,
  tableName: 'User_Vehicle',
  modelName: 'User_Vehicle'
});

export { UserVehicles };