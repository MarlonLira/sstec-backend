import { Op } from 'sequelize';
import { injectable } from "inversify";

import IParkingAdressRepository from '../interfaces/IRepositories/IParkingAdressRepository';
import ParkingAdress from '../models/parkingAdress';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
class ParkingAdressRepository implements IParkingAdressRepository {

  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingAdress} parkingAdress
   * @returns
   * @memberof ParkingAdressRepository
   */
  Update(parkingAdress: ParkingAdress) {
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
  Save(parkingAdress: ParkingAdress): Promise <any>{
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
  Delete(_id: number): Promise <any>{
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
  GetById(parkingAdressId: number): Promise <ParkingAdress>{
    return new Promise((resolve, reject) => {
      ParkingAdress.findOne({
        where:{
          id:{
            [Op.eq]: parkingAdressId
          },
          status:{
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

  ToList(_parkingId): Promise <ParkingAdress[]>{
    return new Promise((resolve, reject) => {
      ParkingAdress.findAll({
        where: {
          parkingId:{
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