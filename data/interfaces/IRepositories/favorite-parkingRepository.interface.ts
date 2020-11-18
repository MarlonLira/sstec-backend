import { FavoriteParking } from '../../models/favorite-parking.model';

export interface IFavoriteParkingRepository {
  save(favoriteParking: FavoriteParking): Promise<any>;
  getById(id: number): Promise<FavoriteParking>;
  getByUserId(userId: number): Promise<FavoriteParking[]>;
  delete(id: number): Promise<any>;
}

