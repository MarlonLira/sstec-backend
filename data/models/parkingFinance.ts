import { Model, DataTypes } from 'sequelize';
import Attributes from '../../commons/core/attributes';
import Context from '../../main/context';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Felipe Seabra
 * @class ParkingFinance
 * @extends {Model}
 */
class ParkingFinance extends Model{
  id!: number;
  month!: string;
  year!: string;
  value!: number;
  parkingId!: number;
  companyId!: number;
  status!: TransactionType;

  /**
   * Creates an instance of ParkingFinance.
   * @author Felipe Seabra
   * @param {*} [json]
   * @memberof ParkingFinance
   */
  constructor(json?: any){
    super();
    this.id = Attributes.ReturnIfValid(json.id);
    this.month = Attributes.ReturnIfValid(json.month);
    this.year = Attributes.ReturnIfValid(json.year);
    this.value = Attributes.ReturnIfValid(json.value);
    this.parkingId = Attributes.ReturnIfValid(json.parkingId);
    this.companyId = Attributes.ReturnIfValid(json.companyId);
    this.status = Attributes.ReturnIfValid(json.status);
  }

  ToModify(){
    return this.toJSON();
  }
}
  ParkingFinance.init({
    id:{
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true
    },
    month:{
      type: new DataTypes.STRING(10),
      allowNull: false
    },
    year:{
      type: new DataTypes.STRING(4),
      allowNull: false
    },
    value:{
      type: new DataTypes.INTEGER(),
      allowNull: false
    },
    parkingId:{
      type: new DataTypes.INTEGER(),
      allowNull: false
    },
    companyId:{
      type: new DataTypes.INTEGER(),
      allowNull: false
    },
    status: {
      type: new DataTypes.STRING(2),
      allowNull: false
    }
  },
  {
    sequelize: _instance,
    tableName: 'ParkingFinance'
  });

export default ParkingFinance;