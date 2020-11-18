import { FavoriteParking } from "../../models/favorite-parking.model";

export interface IFavoriteParkingService {
  save(card: FavoriteParking): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<FavoriteParking>;
  getByUserId(userId: number): Promise<FavoriteParking[]>
}