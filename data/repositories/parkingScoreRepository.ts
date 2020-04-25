import { injectable } from "inversify";
import { Op } from 'sequelize';

import IParkingScoreRepository from '../interfaces/IRepositories/IParkingScoreRepository';
import ParkingScore from '../models/ParkingScore';
import { TransactionType } from "../../commons/enums/transactionType";

@injectable()
class ParkingScoreRepository implements IParkingScoreRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingScore} parkingScore
   * @returns {Promise<any>}
   * @memberof ParkingScoreRepository
   */
  Save(parkingScore: ParkingScore): Promise<any> {
    throw new Error("Method not implemented.");
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