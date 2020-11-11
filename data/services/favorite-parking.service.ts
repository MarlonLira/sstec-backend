import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IFavoriteParkingService } from "../interfaces/IServices/favorite-parkingService.interface";
import { FavoriteParking } from "../models/favorite-parking.model";
import { IFavoriteParkingRepository } from "../interfaces/IRepositories/favorite-parkingRepository.interface";
import Attributes from "../../commons/core/attributes";

@injectable()
export class FavoriteParkingService implements IFavoriteParkingService {

    constructor(
        @inject(TYPES.IFavoriteParkingRepository) private repository: IFavoriteParkingRepository,
        @inject(TYPES.ILogService) private log: ILogService) { }

    save(favoriteParking: FavoriteParking): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const favoriteParkings = await this.repository.getByUserId(favoriteParking.userId);

                if (!Attributes.IsValid(favoriteParkings)) {

                    this.repository.save(favoriteParking)
                        .then(result => resolve(result));

                } else {
                    reject(await this.log.critical('Favorito', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined));
                }
            } catch (error) {
                reject(await this.log.critical('Favorito', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
            }
        });
    }

    delete(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.repository.delete(id)
                .then((result: any) => resolve(result))
                .catch(async (error: any) =>
                    reject(await this.log.critical('Favorito', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
        });
    }

    getById(id: number): Promise<FavoriteParking> {
        return new Promise((resolve, reject) => {
            this.repository.getById(id)
                .then(async (result: FavoriteParking) => resolve(result))
                .catch(async (error: any) =>
                    reject(await this.log.critical('Favorito', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
        });
    }

    getByUserId(userId: number): Promise<FavoriteParking[]> {
        return new Promise((resolve, reject) => {
            this.repository.getByUserId(userId)
                .then(async (result: FavoriteParking[]) => resolve(result))
                .catch(async (error: any) =>
                    reject(await this.log.critical('Favorito', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
        });
    }
}
