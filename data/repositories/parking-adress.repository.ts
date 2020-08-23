import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IParkingAdressRepository } from '../interfaces/IRepositories/parking-adressRepository.interface';
import ParkingAdress from '../models/parking-adress.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
class ParkingAdressRepository implements IParkingAdressRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {number} parkingId
   * @returns {Promise<ParkingAdress>}
   * @memberof ParkingAdressRepository
   */
  getByParkingId(parkingId: number): Promise<ParkingAdress> {
    return new Promise((resolve, reject) => {
      ParkingAdress.findOne({
        where: {
          parkingId: {
            [Op.eq]: parkingId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingAdress) => {
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
   * @param {ParkingAdress} parkingAdress
   * @returns
   * @memberof ParkingAdressRepository
   */
  update(parkingAdress: ParkingAdress) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAdress.sequelize.transaction();
      ParkingAdress.update(parkingAdress.ToModify(),
        {
          where: {
            id: parkingAdress.id
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
   * @author Felipe Seabra
   * @param {ParkingAdress} parkingAdress
   * @memberof ParkingAdressRepository
   */
  save(parkingAdress: ParkingAdress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAdress.sequelize.transaction();
      parkingAdress.status = TransactionType.ACTIVE;
      ParkingAdress.create(parkingAdress, { transaction: _transaction })
        .then(async (createParkingAdress: ParkingAdress) => {
          await _transaction.commit();
          resolve({ "ParkingAdress": createParkingAdress.id })
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _id
   * @returns {Promise <any>}
   * @memberof ParkingAdressRepository
   */
  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAdress.sequelize.transaction();
      ParkingAdress.destroy({
        where: {
          id: _id
        },
        transaction: _transaction
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
   * @author Felipe Seabra
   * @param {number} parkingAdressId
   * @returns
   * @memberof ParkingAdressRepository
   */
  getById(parkingAdressId: number): Promise<ParkingAdress> {
    return new Promise((resolve, reject) => {
      ParkingAdress.findOne({
        where: {
          id: {
            [Op.eq]: parkingAdressId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingAdress) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  toList(_parkingId): Promise<ParkingAdress[]> {
    return new Promise((resolve, reject) => {
      ParkingAdress.findAll({
        where: {
          parkingId: {
            [Op.eq]: _parkingId
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
}

export default ParkingAdressRepository;