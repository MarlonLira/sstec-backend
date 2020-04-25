import { Model, DataTypes } from 'sequelize';
import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Felipe Seabra
 * @class Parking
 */
class ParkingPromotion extends Model {

    id!: number;
    status!: TransactionType;
    name: string;
    description!: string;
    days!: number;
    hours!: number;
    discount!: number;
    parkingId!: number;

  /**
   * Creates an instance of Parking.
   * @author Felipe Seabra
   * @param {*} [json]
   * @memberof Parking
   */
  constructor(json?: any) {
    super()
    this.id = Attributes.ReturnIfValid(json.id);
    this.status = Attributes.ReturnIfValid(json.status);
    this.description = Attributes.ReturnIfValid(json.description);
    this.name = Attributes.ReturnIfValid(json.name);
    this.days = Attributes.ReturnIfValid(json.days);
    this.hours = Attributes.ReturnIfValid(json.hours);
    this.discount = Attributes.ReturnIfValid(json.discount);
    this.parkingId = Attributes.ReturnIfValid(json.parkingId);
  }
  
  ToModify(){
    return this.toJSON();
  }
}

ParkingPromotion.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  description: {
    type: new DataTypes.STRING(50)
  },
  days: {
    type: new DataTypes.INTEGER()
  },
  hours: {
    type: new DataTypes.INTEGER()
  },
  discount: {
    type: new DataTypes.DOUBLE(),
    allowNull: false
  },
  parkingId: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  }
}, {
  sequelize: _instance,
  tableName: 'ParkingPromotion',
});

export default ParkingPromotion;
