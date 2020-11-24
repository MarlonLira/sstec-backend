import { injectable } from "inversify";
import { Op } from 'sequelize';

import { IParkingScoreRepository } from '../interfaces/IRepositories/parking-scoreRepository.interface';
import { ParkingScore, ParkingScoreDAO } from '../models/parking-score.model';

@injectable()
export class ParkingScoreRepository implements IParkingScoreRepository {

  save(parkingScore: ParkingScore): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScoreDAO.sequelize.transaction();
      ParkingScoreDAO.create(parkingScore, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new ParkingScore(result));
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(parkingScore: ParkingScore): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScoreDAO.sequelize.transaction();
      ParkingScoreDAO.update(parkingScore,
        {
          where:
          {
            id: { [Op.eq]: parkingScore.id }
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
      ParkingScoreDAO.findAll({
        where: {
          parkingId: { [Op.eq]: _parkingId },
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<ParkingScore> {
    return new Promise((resolve, reject) => {
      ParkingScoreDAO.findByPk(id)
        .then((parkingScore: any) => resolve(new ParkingScore(parkingScore)))
        .catch((error: any) => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingScoreDAO.sequelize.transaction();
      ParkingScoreDAO.destroy({
        where: {
          id: { [Op.eq]: _id }
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