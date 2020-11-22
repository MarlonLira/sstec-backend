import { ISchedulingProductRepository } from '../interfaces/IRepositories/scheduling-productRepository.interface';
import { SchedulingProduct, SchedulingProductDAO } from '../models/scheduling-product.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';
import { Op } from 'sequelize';

@injectable()
export class SchedulingProductRepository implements ISchedulingProductRepository {

  save(schedulingProduct: SchedulingProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingProductDAO.sequelize.transaction();
      schedulingProduct.status = TransactionType.ACTIVE;
      SchedulingProductDAO.create(schedulingProduct, { transaction: _transaction })
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

  getById(id: number): Promise<SchedulingProduct> {
    return new Promise(async (resolve, reject) => {
      SchedulingProductDAO.findByPk(id)
        .then((result: any) => resolve(new SchedulingProduct(result)))
        .catch(error => reject(error));
    });
  }

  getBySchedulingId(_schedulingId: number): Promise<SchedulingProduct[]> {
    return new Promise(async (resolve, reject) => {
      SchedulingProductDAO.findAll(
        {
          where: {
            schedulingId: { [Op.eq]: _schedulingId },
            status: { [Op.ne]: TransactionType.DELETED }
          }
        }
      )
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByParkingProductId(_parkingProductId: number): Promise<SchedulingProduct[]> {
    return new Promise(async (resolve, reject) => {
      SchedulingProductDAO.findAll(
        {
          where: {
            parkingProductId: { [Op.eq]: _parkingProductId },
            status: { [Op.ne]: TransactionType.DELETED }
          }
        }
      )
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingProductDAO.sequelize.transaction();
      SchedulingProductDAO.update({
        status: TransactionType.DELETED
      },
        {
          where: { id: { [Op.eq]: _id } },
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

  update(schedulingProduct: SchedulingProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingProductDAO.sequelize.transaction();
      SchedulingProductDAO.update(schedulingProduct,
        {
          where: { id: { [Op.eq]: schedulingProduct.id } },
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