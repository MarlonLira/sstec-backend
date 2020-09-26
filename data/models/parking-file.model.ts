import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';

const _instance = Context.getInstance();

export class ParkingFile extends Model {
  id: number;
  name: string;
  encoded: any;
  type: string;
  parkingId: number;

  constructor(json?: any) {
    super();
    if (json) {
      this.id = Attributes.ReturnIfValid(json.id);
      this.name = Attributes.ReturnIfValid(json.name);
      this.encoded = Attributes.ReturnIfValid(json.encoded);
      this.type = Attributes.ReturnIfValid(json.type);
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
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  type: {
    type: new DataTypes.STRING(255),
    allowNull: false
  },
  encoded: {
    type: new DataTypes.BLOB('long'),
    get() {
      return this.getDataValue('encoded').toString('base64');
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