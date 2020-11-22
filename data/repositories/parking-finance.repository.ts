import { Op } from 'sequelize';
import { injectable } from "inversify";
import { IParkingFinanceRepository } from '../interfaces/IRepositories/parking-financeRepository.interface';
import { ParkingFinance, ParkingFinanceDAO } from '../models/parking-finance.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class ParkingFinanceRepository implements IParkingFinanceRepository {

  save(parkingFinance: ParkingFinance): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFinanceDAO.sequelize.transaction();
      parkingFinance.status = TransactionType.ACTIVE;
      ParkingFinanceDAO.create(parkingFinance, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new ParkingFinance(result))
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFinanceDAO.sequelize.transaction();
      ParkingFinanceDAO.update({ status: TransactionType.DELETED, },
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
          await _transaction.rollback();
          reject(error)
        })
    })
  }

  update(parkingFinance: ParkingFinance): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFinanceDAO.sequelize.transaction();
      ParkingFinanceDAO.update(parkingFinance,
        {
          where: {
            id: { [Op.eq]: parkingFinance.id }
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

  getById(parkingFinanceId: number): Promise<ParkingFinance> {
    return new Promise((resolve, reject) => {
      ParkingFinanceDAO.findOne({
        where: {
          id: { [Op.eq]: parkingFinanceId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(new ParkingFinance(result)))
        .catch((error: any) => reject(error));
    });
  }

  toList(_parkingId): Promise<ParkingFinance[]> {
    return new Promise((resolve, reject) => {
      ParkingFinanceDAO.findAll({
        where: {
          parkingId: { [Op.eq]: _parkingId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }
}
