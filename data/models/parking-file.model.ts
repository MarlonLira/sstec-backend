import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';

const _instance = Context.getInstance();

export class ParkingFile extends Model {
  id: number;
  name: string;
  path: string;
  parkingId: number;

  constructor(json?: any) {
    super();
    if (json) {
      this.id = Attributes.ReturnIfValid(json.id);
      this.name = Attributes.ReturnIfValid(json.name);
      this.path = Attributes.ReturnIfValid(json.path);
      this.parkingId = Attributes.ReturnIfValid(json.parkingId);
    }
  }

  ToModify() {
    return this.toJSON();
  }
}

ParkingFile.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(255)
  },
  path: {
    type: new DataTypes.STRING(255)
  },
  parkingId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'ParkingFile'
});