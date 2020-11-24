import { injectable } from "inversify";
import { Op } from 'sequelize';

import { IParkingProductRepository } from '../interfaces/IRepositories/parking-productRepository.interface';
import { ParkingProduct, ParkingProductDAO } from '../models/parking-product.model';
import { TransactionType } from "../../commons/enums/transactionType";
import { ParkingDAO } from "../models/parking.model";

@injectable()
export class ParkingProductRepository implements IParkingProductRepository {

  save(parkingProduct: ParkingProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingProductDAO.sequelize.transaction();
      parkingProduct.status = TransactionType.ACTIVE;
      ParkingProductDAO.create(parkingProduct, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new ParkingProduct(result));
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(parkingProduct: ParkingProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingProductDAO.sequelize.transaction();
      ParkingProductDAO.update(parkingProduct,
        {
          where:
          {
            id: { [Op.eq]: parkingProduct.id }
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
      const _transaction = await ParkingProductDAO.sequelize.transaction();
      ParkingProductDAO.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: { [Op.eq]: _id }
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
      ParkingProductDAO.findAll({
        where: {
          parkingId: { [Op.eq]: id },
          status: { [Op.eq]: TransactionType.ACTIVE },
        },
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<ParkingProduct> {
    return new Promise((resolve, reject) => {
      ParkingProductDAO.findByPk(id, {
        include: [{ model: ParkingDAO, as: 'parking' }]
      })
        .then((result: any) => resolve(new ParkingProduct(result)))
        .catch((error: any) => reject(error));
    });
  }

  toList(): Promise<ParkingProduct[]> {
    return new Promise((resolve, reject) => {
      ParkingProductDAO.findAll({
        where: {
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }
}