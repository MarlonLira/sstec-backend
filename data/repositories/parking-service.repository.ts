import { injectable } from "inversify";
import { Op } from 'sequelize';

import { IParkingServiceRepository } from '../interfaces/IRepositories/parking-serviceRepository.interface';
import { ParkingService } from '../models/parking-service.model';
import { TransactionType } from "../../commons/enums/transactionType";

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @class ParkingServiceRepository
 * @implements {IParkingServiceRepository}
 */
@injectable()
export class ParkingServiceRepository implements IParkingServiceRepository {

  save(parkingService: ParkingService): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingService.sequelize.transaction();
      parkingService.status = TransactionType.ACTIVE;
      ParkingService.create(parkingService, { transaction: _transaction })
        .then(async (result: ParkingService) => {
          await _transaction.commit();
          resolve(result);
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(parkingService: ParkingService): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingService.sequelize.transaction();
      ParkingService.update(parkingService.ToAny(),
        {
          where:
          {
            id: parkingService.id
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
      const _transaction = await ParkingService.sequelize.transaction();
      ParkingService.update({
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

  getByParkingId(id: number): Promise<ParkingService[]> {
    return new Promise(async (resolve, reject) => {
      ParkingService.findAll({
        where: {
          parkingId: { [Op.eq]: id },
          status: { [Op.eq]: TransactionType.ACTIVE },
        },
      })
        .then((parkingService: ParkingService[]) => resolve(parkingService))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<ParkingService> {
    return new Promise((resolve, reject) => {
      ParkingService.findByPk(id)
        .then((parkingService: ParkingService) => resolve(parkingService))
        .catch((error: any) => reject(error));
    });
  }

  toList(): Promise<ParkingService[]> {
    return new Promise((resolve, reject) => {
      ParkingService.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingService[]) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }
}