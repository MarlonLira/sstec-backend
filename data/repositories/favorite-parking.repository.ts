import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IFavoriteParkingRepository } from '../interfaces/IRepositories/favorite-parkingRepository.interface';
import { FavoriteParking } from '../models/favorite-parking.model';

@injectable()
export class FavoriteParkingRepository implements IFavoriteParkingRepository {

    save(favoriteParking: FavoriteParking): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const _transaction = await FavoriteParking.sequelize.transaction();
            FavoriteParking.create(favoriteParking, { transaction: _transaction })
                .then(async (result: FavoriteParking) => {
                    await _transaction.commit();
                    resolve(result);
                })
                .catch(async error => {
                    await _transaction.rollback();
                    reject(error)
                });
        });
    }

    getById(id: number): Promise<FavoriteParking> {
        return new Promise(async (resolve, reject) => {
            FavoriteParking.findByPk(id)
                .then((favoriteParking: FavoriteParking) => resolve(favoriteParking))
                .catch(error => reject(error));
        });
    }

    getByUserId(userId: number): Promise<FavoriteParking[]> {
        return new Promise(async (resolve, reject) => {
            FavoriteParking.findAll(
                {
                    where: {
                        userId: userId,
                    }
                }
            )
                .then((favoriteParkingS: FavoriteParking[]) => resolve(favoriteParkingS))
                .catch(error => reject(error));
        });
    }

    delete(id: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const _transaction = await FavoriteParking.sequelize.transaction();
            FavoriteParking.destroy({
                where: {
                    id: { [Op.eq]: id }
                },
                transaction: _transaction
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