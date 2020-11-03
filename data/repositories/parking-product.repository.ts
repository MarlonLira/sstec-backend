import { injectable } from "inversify";
import { Op } from 'sequelize';

import { IParkingProductRepository } from '../interfaces/IRepositories/parking-productRepository.interface';
import { ParkingProduct } from '../models/parking-product.model';
import { TransactionType } from "../../commons/enums/transactionType";
import { Parking } from "../models/parking.model";

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @class ParkingProductRepository
 * @implements {IParkingProductRepository}
 */
@injectable()
export class ParkingProductRepository implements IParkingProductRepository {

  save(parkingProduct: ParkingProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingProduct.sequelize.transaction();
      parkingProduct.status = TransactionType.ACTIVE;
      ParkingProduct.create(parkingProduct, { transaction: _transaction })
        .then(async (result: ParkingProduct) => {
          await _transaction.commit();
          resolve(result);
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(parkingProduct: ParkingProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingProduct.sequelize.transaction();
      ParkingProduct.update(parkingProduct.ToAny(),
        {
          where:
          {
            id: parkingProduct.id
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

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingProduct.sequelize.transaction();
      ParkingProduct.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: _id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.commit();
          reject(error);
        });
    });
  }

  getByParkingId(id: number): Promise<ParkingProduct[]> {
    return new Promise(async (resolve, reject) => {
      ParkingProduct.findAll({
        where: {
          parkingId: { [Op.eq]: id },
          status: { [Op.eq]: TransactionType.ACTIVE },
        },
      })
        .then((parkingProduct: ParkingProduct[]) => resolve(parkingProduct))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<ParkingProduct> {
    return new Promise((resolve, reject) => {
      ParkingProduct.findByPk(id, {
        include: [{ model: Parking, as: 'parking' }],
        raw: true,
        nest: true
      })
        .then((parkingProduct: ParkingProduct) => resolve(parkingProduct))
        .catch((error: any) => reject(error));
    });
  }

  toList(): Promise<ParkingProduct[]> {
    return new Promise((resolve, reject) => {
      ParkingProduct.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingProduct[]) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }
}