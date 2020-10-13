import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

class Vehicle extends Model {

  id!: number;
  status!: TransactionType;
  model!: string;
  color!: string;
  type!: string;
  licensePlate!: string;
  userId!: number;

  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.model = Attributes.ReturnIfValid(json.model);
    this.color = Attributes.ReturnIfValid(json.color);
    this.type = Attributes.ReturnIfValid(json.type);
    this.licensePlate = Attributes.ReturnIfValid(json.licensePlate);
    this.userId = Attributes.ReturnIfValid(json.userId);
  }

  ToAny(){
    return this.toJSON();
  }
}

Vehicle.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  model: {
    type: new DataTypes.STRING(12),
    allowNull: false
  },
  color: {
    type: new DataTypes.STRING(12),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  licensePlate: {
    type: new DataTypes.STRING(10),
    allowNull: false
  },
  userId :{
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'Vehicle'
});

export default Vehicle;