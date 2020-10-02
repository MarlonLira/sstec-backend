import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IUserAddressRepository } from "../interfaces/IRepositories/user-addressRepository.interface";
import { IUserAddressService } from "../interfaces/IServices/user-addressService.interface";
import { UserAddress } from "../models/user-address.model";

@injectable()
export class UserAddressService implements IUserAddressService {

  constructor(
    @inject(TYPES.IUserAddressRepository) private repository: IUserAddressRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  save(userAddress: UserAddress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(userAddress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User Address', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(userAddress: UserAddress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(userAddress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User Address', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<UserAddress> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: UserAddress) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User Address', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByUserId(id: number): Promise<UserAddress> {
    return new Promise((resolve, reject) => {
      this.repository.getByUserId(id)
        .then((result: UserAddress) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User Address', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
