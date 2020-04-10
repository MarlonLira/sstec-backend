import { Model, DataTypes } from 'sequelize';

import { DbInstance } from '../../main/context';
import Attributes from '../../commons/core/attributes';

var _instance = DbInstance.getInstance()

class ParkingSpace extends Model {
  id!: number;
  status: string;
  description!: string;
  value: number;
}

export default ParkingSpace;