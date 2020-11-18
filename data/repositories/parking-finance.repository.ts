import { Op } from 'sequelize';
import { injectable } from "inversify";
import { IParkingFinanceRepository } from '../interfaces/IRepositories/parking-financeRepository.interface';
import { ParkingFinance } from '../models/parking-finance.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class ParkingFinanceRepository implements IParkingFinanceRepository {

  save(parkingFinance: ParkingFinance): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFinance.sequelize.transaction();
      parkingFinance.status = TransactionType.ACTIVE;
      ParkingFinance.create(parkingFinance, { transaction: _transaction })
        .then(async (createParkingFinance: ParkingFinance) => {
          await _transaction.commit();
          resolve({ "id": createParkingFinance.id })
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFinance.sequelize.transaction();
      ParkingFinance.update({
        status: TransactionType.DELETED,
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
          reject(error)
        })
    })
  }

  update(parkingFinance: ParkingFinance): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFinance.sequelize.transaction();
      ParkingFinance.update(parkingFinance.ToAny(),
        {
          where: {
            id: parkingFinance.id
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

  getById(parkingFinanceId: number): Promise<ParkingFinance> {
    return new Promise((resolve, reject) => {
      ParkingFinance.findOne({
        where: {
          id: {
            [Op.eq]: parkingFinanceId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingFinance) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  toList(_parkingId): Promise<ParkingFinance[]> {
    return new Promise((resolve, reject) => {
      ParkingFinance.findAll({
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
