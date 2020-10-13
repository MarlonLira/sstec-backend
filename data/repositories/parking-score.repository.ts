import { injectable } from "inversify";
import { Op } from 'sequelize';

import IParkingScoreRepository from '../interfaces/IRepositories/parking-scoreRepository.interface';
import { ParkingScore } from '../models/parking-score.model';

@injectable()
export class ParkingScoreRepository implements IParkingScoreRepository {

  save(parkingScore: ParkingScore): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScore.sequelize.transaction();
      ParkingScore.create(parkingScore, { transaction: _transaction })
        .then(async (result: ParkingScore) => {
          await _transaction.commit();
          resolve(result);
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(parkingScore: ParkingScore): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScore.sequelize.transaction();
      ParkingScore.update(parkingScore.ToAny(),
        {
          where:
          {
            id: parkingScore.id
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

  getByParkingId(_parkingId: number): Promise<ParkingScore[]> {
    return new Promise((resolve, reject) => {
      ParkingScore.findAll({
        where: {
          parkingId: {
            [Op.eq]: _parkingId
          },
        }
      })
        .then((result: ParkingScore[]) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<ParkingScore> {
    return new Promise((resolve, reject) => {
      ParkingScore.findByPk(id)
        .then((parkingScore: ParkingScore) => resolve(parkingScore))
        .catch((error: any) => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScore.sequelize.transaction();
      ParkingScore.destroy({
        where: {
          id: _id
        },
        transaction: _transaction
      })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback()
          reject(error);
        });
    });
  }
}