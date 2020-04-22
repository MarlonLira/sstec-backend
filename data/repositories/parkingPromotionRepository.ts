import { Op } from 'sequelize';
import { injectable } from "inversify";

import IParkingPromotionRepository from '../interfaces/IRepositories/IParkingPromotionRepository';
import ParkingPromotion from '../models/parkingPromotion';
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Felipe Seabra
 * @class ParkingRepository
 * @implements {IParkingRepository}
 */
@injectable()
class ParkingPromotionRepository implements IParkingPromotionRepository {

  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingPromotion} parkingPromotion
   * @memberof ParkingPromotionRepository
   */
  Update(parkingPromotion: ParkingPromotion) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPromotion.sequelize.transaction();
      ParkingPromotion.update(parkingPromotion.ToModify(),
        {
          where: {
            id: parkingPromotion.id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async _result => {
          await _transaction.commit();
          resolve(_result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {number} id
   * @memberof ParkingPromotionRepository
   */
  Delete(_id: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPromotion.sequelize.transaction();
      ParkingPromotion.update({
        status: TransactionType.DELETED,
      },
        {
          where: {
            id: _id
          },
          transaction: _transaction
        })
        .then(async _result => {
          await _transaction.commit();
          resolve(_result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingPromotion} parkingPromotion
   * @memberof ParkingPromotionRepository
   */
  Save(parkingPromotion: ParkingPromotion) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPromotion.sequelize.transaction();
      parkingPromotion.status = TransactionType.ACTIVE;
      ParkingPromotion.create(parkingPromotion, { transaction: _transaction })
        .then(async (createPromotion: ParkingPromotion) => {
          await _transaction.commit();
          resolve({ "parkingPromotionId": createPromotion.id })
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {string} parkingPromotionName
   * @memberof ParkingPromotionRepository
   */
  GetByName(parkingPromotionName: string) {
    return new Promise((resolve, reject) => {
      ParkingPromotion.findAll({
        where: {
          name: {
            [Op.like]: `${parkingPromotionName}%`
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then(result => {
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
   * @memberof ParkingPromotionRepository
   */
  ToList() {
    return new Promise((resolve, reject) => {
      ParkingPromotion.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default ParkingPromotionRepository;