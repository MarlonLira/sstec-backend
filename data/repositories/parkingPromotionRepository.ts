import { Op, Transaction } from 'sequelize';
import { injectable } from "inversify";

import IParkingPromotionRepository from '../interfaces/IRepositories/IParkingPromotionRepository';
import Card from '../models/card';
import User from '../models/user';
import ParkingPromotion from '../models/parkingPromotion';
import parking from '../models/parking'
import { resolve } from 'dns';
import Parking from '../models/parking';
import { results } from 'inversify-express-utils';

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
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {number} id
   * @memberof ParkingPromotionRepository
   */
  Delete(id: number) {
    throw new Error("Method not implemented.");
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
          parkingPromotion.status = 'AT'
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
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {string} parkingPromotionName
   * @memberof ParkingPromotionRepository
   */
  GetByName(parkingPromotionName: string) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Felipe Seabra
   * @memberof ParkingPromotionRepository
   */
  ToList() {
    throw new Error("Method not implemented.");
  }
}

export default ParkingPromotionRepository;