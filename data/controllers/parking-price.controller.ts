import { injectable } from "inversify";
import { Op, QueryTypes, Sequelize } from 'sequelize';
import { TransactionType } from '../../commons/enums/transactionType';
import { ParkingPrice } from '../models/parking-price.model';
import { IParkingPriceRepository } from '../interfaces/IRepositories/parking-priceRepository.interface';

@injectable()
export class ParkingPriceRepository implements IParkingPriceRepository {

  save(parkingPrice: ParkingPrice): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPrice.sequelize.transaction();
      parkingPrice.status = TransactionType.ACTIVE;
      ParkingPrice.create(parkingPrice, { transaction: _transaction })
        .then(async (result: ParkingPrice) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
  update(parkingPrice: ParkingPrice): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPrice.sequelize.transaction();
      ParkingPrice.update(parkingPrice.ToAny(),
        {
          where:
          {
            id: parkingPrice.id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
  toList(parkingId: number): Promise<ParkingPrice[]> {
    return new Promise((resolve, reject) => {
      ParkingPrice.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingPrice[]) => resolve(result))
        .catch((error: any) => reject(error));
    })
  }
  getById(id: number): Promise<ParkingPrice> {
    return new Promise((resolve, reject) => {
      ParkingPrice.findByPk(id)
        .then((parkingPrice: ParkingPrice) => resolve(parkingPrice))
        .catch((error: any) => reject(error));
    });
  }
  delete(parkingPriceId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingPrice.sequelize.transaction();
      ParkingPrice.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: parkingPriceId
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
