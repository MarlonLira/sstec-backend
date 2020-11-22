import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IFavoriteParkingRepository } from '../interfaces/IRepositories/favorite-parkingRepository.interface';
import { FavoriteParking, FavoriteParkingDAO } from '../models/favorite-parking.model';

@injectable()
export class FavoriteParkingRepository implements IFavoriteParkingRepository {

  save(favoriteParking: FavoriteParking): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await FavoriteParkingDAO.sequelize.transaction();
      FavoriteParkingDAO.create(favoriteParking, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new FavoriteParking(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error)
        });
    });
  }

  getById(id: number): Promise<FavoriteParking> {
    return new Promise(async (resolve, reject) => {
      FavoriteParkingDAO.findByPk(id)
        .then((favoriteParking: any) => resolve(new FavoriteParking(favoriteParking)))
        .catch((error: any) => reject(error));
    });
  }

  getByUserId(userId: number): Promise<FavoriteParking[]> {
    return new Promise(async (resolve, reject) => {
      FavoriteParkingDAO.findAll(
        {
          where: {
            userId: userId,
          }
        }
      )
        .then((favoriteParkingS: any) => resolve(favoriteParkingS))
        .catch((error: any) => reject(error));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await FavoriteParkingDAO.sequelize.transaction();
      FavoriteParkingDAO.destroy({
        where: {
          id: { [Op.eq]: id }
        },
        transaction: _transaction
      })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new FavoriteParking(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
}