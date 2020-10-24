import { ISchedulingServiceRepository } from '../interfaces/IRepositories/scheduling-serviceRepository.interface';
import { SchedulingService } from '../models/scheduling-service.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Gustavo Gusmão
 * @class SchedulingServiceRepository
 * @implements {ISchedulingServiceRepository}
 */
@injectable()
export class SchedulingServiceRepository implements ISchedulingServiceRepository {

  save(schedulingService: SchedulingService): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingService.sequelize.transaction();
      schedulingService.status = TransactionType.ACTIVE;
      SchedulingService.create(schedulingService, { transaction: _transaction })
        .then(async (createdSchedulingService: SchedulingService) => {
          await _transaction.commit();
          resolve({ "schedulingServiceId": createdSchedulingService.id })
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error)
        });
    });
  }

  getById(id: number): Promise<SchedulingService> {
    return new Promise(async (resolve, reject) => {
      SchedulingService.findByPk(id)
        .then((result: SchedulingService) => resolve(result))
        .catch(error => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingService.sequelize.transaction();
      SchedulingService.update({
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

  update(schedulingService: SchedulingService): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingService.sequelize.transaction();
      SchedulingService.update(schedulingService.ToAny(),
        {
          where:
          {
            id: schedulingService.id
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