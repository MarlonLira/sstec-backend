import { injectable } from "inversify";
import { Op } from 'sequelize';

import IParkingScoreRepository from '../interfaces/IRepositories/IParkingScoreRepository';
import ParkingScore from '../models/ParkingScore';
import { TransactionType } from "../../commons/enums/transactionType";
import ParkingSpace from "../models/parkingSpace";
import Parking from "../models/parking";

@injectable()
class ParkingScoreRepository implements IParkingScoreRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingScore} parkingScore
   * @returns {Promise<any>}
   * @memberof ParkingScoreRepository
   */
  Save(parkingScore: ParkingScore, parking:Parking): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScore.sequelize.transaction();
      parking.status = TransactionType.ACTIVE;
            ParkingScore.create(parkingScore, { transaction: _transaction })
        .then(async (createParkingScore: ParkingScore) => {
          await _transaction.commit();
          resolve({ "parkingScoreId": createParkingScore.id });
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingScore} parkingScore
   * @returns {Promise<any>}
   * @memberof ParkingScoreRepository
   */
  Update(parkingScore: ParkingScore): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @returns {Promise<ParkingScore[]>}
   * @memberof ParkingScoreRepository
   */
  ToList(): Promise<ParkingScore[]> {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<ParkingScore>}
   * @memberof ParkingScoreRepository
   */
  GetById(id: number): Promise<ParkingScore> {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof ParkingScoreRepository
   */
  Delete(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default ParkingScoreRepository;