import { Op } from 'sequelize';
import { injectable } from "inversify";
import IParkingFinanceRepository from '../interfaces/IRepositories/IParkingFinanceRepository';
import ParkingFinance from  '../models/parkingFinance';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
class ParkingFinanceRepository implements IParkingFinanceRepository{
 
  Save(parkingFinance: ParkingFinance) {
    throw new Error("Method not implemented.");
  }
  Update(parkingFinance: ParkingFinance) {
    throw new Error("Method not implemented.");
  }
  getById(parkingFinanceId: number) {
    throw new Error("Method not implemented.");
  }
  ToList() {
    throw new Error("Method not implemented.");
  }
}
export default ParkingFinanceRepository;
