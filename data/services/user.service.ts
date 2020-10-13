import { injectable, inject } from "inversify";
import { IParkingRepository } from "../interfaces/IRepositories/parkingRepository.interface";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { IParkingService } from "../interfaces/IServices/parkingService.interface";
import { Parking } from "../models/parking.model";
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { IParkingAdressService } from "../interfaces/IServices/parking-adressService.interface";
import { ParkingAdress } from "../models/parking-adress.model";
import { IUserRepository } from "../interfaces/IRepositories/userRepository.interface";
import { IUserService } from "../interfaces/IServices/userService.interface";
import { User } from "../models/user.model";
import { IUserAdressService } from "../interfaces/IServices/user-adressService.interface";
import Crypto from '../../commons/core/crypto';
import { CryptoType } from "../../commons/enums/cryptoType";
import { UserAdress } from "../models/user-adress.model";

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TYPES.IUserRepository) private repository: IUserRepository,
    @inject(TYPES.IUserAdressService) private adressService: IUserAdressService,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getByName(name: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  getByRegistryCode(registryCode: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByRegistryCode(registryCode)
        .then(async (result: User[]) => {
          resolve(result);
        }).catch(async (error: any) =>
          reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByEmail(_email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: User) => {
          const _result: any = result.ToModify();
          _result.adress = await this.adressService.getByUserId(result.id);
          resolve(_result);
        }).catch(async (error: any) =>
          reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  toList(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  save(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.getByRegistryCode(user.registryCode)
        .then(async found => {
          if (!Attributes.IsValid(found)) {
            user.password = Attributes.IsValid(user.password) ? Crypto.Encrypt(user.password, CryptoType.PASSWORD) : undefined;
            this.repository.save(user)
              .then(async (result: User) => {
                result.adress.userId = result.id;
                const adress: UserAdress = new UserAdress(result.adress);
                await this.adressService.save(adress);
                resolve(result);
              })
              .catch(async (error: any) =>
                reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
          } else {
            reject(await this.log.critical('User', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined));
          }
        });
    });
  }

  update(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(user)
        .then(result => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

}
