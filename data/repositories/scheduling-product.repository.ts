import { ISchedulingProductRepository } from '../interfaces/IRepositories/scheduling-productRepository.interface';
import { SchedulingProduct } from '../models/scheduling-product.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';
import { Op } from 'sequelize';

@injectable()
export class SchedulingProductRepository implements ISchedulingProductRepository {

  save(schedulingProduct: SchedulingProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await schedulingProduct.sequelize.transaction();
      schedulingProduct.status = TransactionType.ACTIVE;
      SchedulingProduct.create(schedulingProduct, { transaction: _transaction })
        .then(async (result: SchedulingProduct) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error)
        });
    });
  }

  getById(id: number): Promise<SchedulingProduct> {
    return new Promise(async (resolve, reject) => {
      SchedulingProduct.findByPk(id)
        .then((result: SchedulingProduct) => resolve(result))
        .catch(error => reject(error));
    });
  }

  getBySchedulingId(_schedulingId: number): Promise<SchedulingProduct[]> {
    return new Promise(async (resolve, reject) => {
      SchedulingProduct.findAll(
        {
          where: {
            schedulingId: _schedulingId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((schedulingProducts: SchedulingProduct[]) => resolve(schedulingProducts))
        .catch(error => reject(error));
    });
  }

  getByParkingProductId(_parkingProductId: number): Promise<SchedulingProduct[]> {
    return new Promise(async (resolve, reject) => {
      SchedulingProduct.findAll(
        {
          where: {
            parkingProductId: _parkingProductId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((parkingProducts: SchedulingProduct[]) => resolve(parkingProducts))
        .catch(error => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingProduct.sequelize.transaction();
      SchedulingProduct.update({
        status: TransactionType.DELETED
      },
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
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(schedulingProduct: SchedulingProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingProduct.sequelize.transaction();
      SchedulingProduct.update(schedulingProduct.ToAny(),
        {
          where:
          {
            id: schedulingProduct.id
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
}