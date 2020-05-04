import { injectable } from "inversify";
import { Op } from 'sequelize';

import IParkingScoreRepository from '../interfaces/IRepositories/IParkingScoreRepository';
import ParkingScore from '../models/parkingScore';
import { TransactionType } from "../../commons/enums/transactionType";
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
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScore.sequelize.transaction();
      ParkingScore.update(parkingScore.ToModify(),
        {
          where:
          {
            id: parkingScore.id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @returns {Promise<ParkingScore[]>}
   * @memberof ParkingScoreRepository
   */
  ToList(_parkingId: number): Promise<ParkingScore[]> {
    return new Promise((resolve, reject) => {
      ParkingScore.findAll({
        where: {
          parkingId: _parkingId,
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingScore[]) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<ParkingScore>}
   * @memberof ParkingScoreRepository
   */
  GetById(id: number): Promise<ParkingScore> {
    return new Promise((resolve, reject) => {
      ParkingScore.findByPk(id)
        .then((parkingScore: ParkingScore) => {
          resolve(parkingScore)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof ParkingScoreRepository
   */
  Delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScore.sequelize.transaction();
      ParkingScore.update({},
        {
          where: {
            id: _id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback()
          reject(error);
        });
    });
  }
}

export default ParkingScoreRepository;