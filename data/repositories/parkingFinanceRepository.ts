import { Op } from 'sequelize';
import { injectable } from "inversify";
import IParkingFinanceRepository from '../interfaces/IRepositories/IParkingFinanceRepository';
import ParkingFinance from  '../models/parkingFinance';
import { TransactionType } from '../../commons/enums/transactionType';
import Parking from  '../models/parking';

@injectable()
class ParkingFinanceRepository implements IParkingFinanceRepository{

  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingFinance} parkingFinance
   * @memberof ParkingFinanceRepository
   */
  Save(parkingFinance: ParkingFinance):Promise<any> {
    return new Promise(async (resolve, reject) =>{
      const _transaction = await ParkingFinance.sequelize.transaction();
      ParkingFinance.create(parkingFinance, {transaction: _transaction})
      .then(async (createParkingFinance:  ParkingFinance) => {
        await _transaction.commit();
        resolve({"id": createParkingFinance.id})
      }).catch(async error =>{
        await _transaction.rollback();
        reject(error);
      });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingFinance} parkingFinance
   * @memberof ParkingFinanceRepository
   */
  Update(parkingFinance: ParkingFinance): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFinance.sequelize.transaction();
      ParkingFinance.update(parkingFinance.ToModify(),
      {
        where:{
          id: parkingFinance.id
        },
        transaction: _transaction,
        validate: false
      })
      .then(async result => {
        await _transaction.commit();
        resolve(result);
      })
      .catch(async error =>{
        await _transaction.rollback();
        reject(error);
      });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {number} parkingFinanceId
   * @memberof ParkingFinanceRepository
   */
  getById(parkingFinanceId: number) {
    return new Promise((resolve, reject) => {
      ParkingFinance.findByPk(parkingFinanceId)
      .then((result: ParkingFinance) => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @memberof ParkingFinanceRepository
   */
  ToList() {
    return new Promise ((resolve, reject) => {
      ParkingFinance.findAll()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
}
export default ParkingFinanceRepository;
