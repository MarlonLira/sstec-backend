import { injectable } from "inversify";
import { Op } from 'sequelize';
import { TransactionType } from '../../commons/enums/transactionType';

import { IParkingPriceRepository } from '../interfaces/IRepositories/parking-priceRepository.interface';
import { ParkingPrice, ParkingPriceDAO } from "../models/parking-price.model";


@injectable()
export class ParkingPriceRepository implements IParkingPriceRepository {

  getByParkingId(id: number): Promise<ParkingPrice[]> {
    return new Promise(async (resolve, reject) => {
      ParkingPriceDAO.findAll({
        where: {
          parkingId: { [Op.eq]: id },
          status: { [Op.eq]: TransactionType.ACTIVE },
        },
      })
        .then((parkingPrice: any) => resolve(parkingPrice))
        .catch((error: any) => reject(error));
    });
  }

  deleteGroupType(parkingPrice: ParkingPrice): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPriceDAO.sequelize.transaction();
      ParkingPriceDAO.update({
        status: TransactionType.DELETED,
      },
        {
          where: {
            vehicleType: {
              [Op.eq]: parkingPrice.vehicleType
            },
            parkingId: {
              [Op.eq]: parkingPrice.parkingId,
            },
            status: {
              [Op.eq]: TransactionType.ACTIVE
            }
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  save(model: ParkingPrice): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPriceDAO.sequelize.transaction();
      ParkingPriceDAO.create(model, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new ParkingPrice(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(model: ParkingPrice): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPriceDAO.sequelize.transaction();
      ParkingPriceDAO.update(model,
        {
          where: {
            id: { [Op.eq]: model.id }
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  getById(id: number): Promise<ParkingPrice> {
    return new Promise((resolve, reject) => {
      ParkingPriceDAO.findByPk(id)
        .then((result: any) => resolve(new ParkingPrice(result)))
        .catch((error: any) => reject(error));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPriceDAO.sequelize.transaction();
      ParkingPriceDAO.update({ status: TransactionType.DELETED },
        {
          where: {
            id: { [Op.eq]: id }
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

}
