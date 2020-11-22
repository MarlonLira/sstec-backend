import { injectable } from "inversify";
import { Op } from 'sequelize';
import { TransactionType } from '../../commons/enums/transactionType';
import { ParkingPrice } from '../models/parking-price.model';
import { IParkingPriceRepository } from '../interfaces/IRepositories/parking-priceRepository.interface';
import { ParkingScore, ParkingScoreDAO } from "../models/parking-score.model";

@injectable()
export class ParkingPriceRepository implements IParkingPriceRepository {

  save(parkingPrice: ParkingPrice): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScoreDAO.sequelize.transaction();
      parkingPrice.status = TransactionType.ACTIVE;
      ParkingScoreDAO.create(parkingPrice, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new ParkingScore(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(parkingPrice: ParkingPrice): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScoreDAO.sequelize.transaction();
      ParkingScoreDAO.update(parkingPrice,
        {
          where:
          {
            id: { [Op.eq]: parkingPrice.id }
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

  toList(parkingId: number): Promise<ParkingPrice[]> {
    return new Promise((resolve, reject) => {
      ParkingScoreDAO.findAll({
        where: {
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    })
  }

  getById(id: number): Promise<ParkingPrice> {
    return new Promise((resolve, reject) => {
      ParkingScoreDAO.findByPk(id)
        .then((result: any) => resolve(new ParkingPrice(result)))
        .catch((error: any) => reject(error));
    });
  }

  delete(parkingPriceId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScoreDAO.sequelize.transaction();
      ParkingScoreDAO.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: { [Op.eq]: parkingPriceId }
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
