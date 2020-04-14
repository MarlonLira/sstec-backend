import { Op, Transaction } from 'sequelize';
import { injectable } from "inversify";

import IParkingPromotionRepository from '../interfaces/IRepositories/IParkingPromotionRepository';
import ParkingPromotion from '../models/parkingPromotion';
import { resolve } from 'dns';
import Parking from '../models/parking';
import Attributes from '../../commons/core/attributes';
import Querying from '../../commons/core/querying';
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
      ParkingPromotion.findByPk(parkingPromotion.id)
        .then((result: ParkingPromotion) => {
          if (!Attributes.ReturnIfValid(result)) {
            reject('Promoção não encontrada');
          }
          ParkingPromotion.update({
            status: Attributes.ReturnIfValid(parkingPromotion.status, result.status),
            name: Attributes.ReturnIfValid(parkingPromotion.name, result.name),
            description: Attributes.ReturnIfValid(parkingPromotion.description, result.description),
            days: Attributes.ReturnIfValid(parkingPromotion.days, result.days),
            hours: Attributes.ReturnIfValid(parkingPromotion.hours, result.hours),
            discount: Attributes.ReturnIfValid(parkingPromotion.discount, result.discount)
          },
            {
              where: {
                id: parkingPromotion.id
              },
              transaction: _transaction
            })
            .then(result => {
              _transaction.commit();
              resolve(result);
            })
            .catch(error => {
              _transaction.rollback();
              reject(error);
            });
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {number} id
   * @memberof ParkingPromotionRepository
   */
  Delete(id: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPromotion.sequelize.transaction();
      ParkingPromotion.findByPk(id)
        .then((result: ParkingPromotion) => {
          if (!Attributes.IsValid(result)) {
            reject('Promoção não encontrada')
          }
          ParkingPromotion.update({
            status: 'EX',
            name: Attributes.ReturnIfValid(result.name),
            description: Attributes.ReturnIfValid(result.description),
            days: Attributes.ReturnIfValid(result.days),
            hours: Attributes.ReturnIfValid(result.hours),
            discount: Attributes.ReturnIfValid(result.discount)
          },
            {
              where: {
                id: id
              },
              transaction: _transaction
            })
            .then(result => {
              _transaction.commit();
              resolve(result);
            })
            .catch(error => {
              _transaction.rollback();
              reject(error);
            })
        })
    })
  }


  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingPromotion} parkingPromotion
   * @memberof ParkingPromotionRepository
   */
  Save(parkingPromotion: ParkingPromotion, parkingId: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPromotion.sequelize.transaction();
      Parking.findByPk(parkingId)
        .then((parking: Parking) => {
          console.log(parking);
          console.log(parkingPromotion);
          parkingPromotion.status = TransactionType.ACTIVE;
          ParkingPromotion.create(parkingPromotion, { transaction: _transaction })
            .then((createPromotion: ParkingPromotion) => {
              _transaction.commit();
              resolve({ "parkingPromotionId": createPromotion.id })
            }).catch(error => {
              _transaction.rollback();
              reject(error);
            });
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingPromotion} parkingPromotion
   * @param {string[]} properties
   * @memberof ParkingPromotionRepository
   */
  Find(parkingPromotion: ParkingPromotion, properties: string[]) {
    return new Promise((resolve, reject) => {
      let query: any;
      query = Querying.Or(ParkingPromotion, properties);
      ParkingPromotion.findAll({
        where: query
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        })
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
          }
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        })
    })
  }

  /**
   * @description
   * @author Felipe Seabra
   * @memberof ParkingPromotionRepository
   */
  ToList() {
    return new Promise((resolve, rejects) => {
      ParkingPromotion.findAll()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          rejects(error);
        })
    })
  }
}

export default ParkingPromotionRepository;