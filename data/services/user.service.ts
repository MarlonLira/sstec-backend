import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { Attributes } from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { IUserRepository } from "../interfaces/IRepositories/userRepository.interface";
import { IUserService } from "../interfaces/IServices/userService.interface";
import { User } from "../models/user.model";
import { IUserAddressService } from "../interfaces/IServices/user-addressService.interface";
import { Crypto } from '../../commons/core/crypto';
import { CryptoType } from "../../commons/enums/cryptoType";
import { UserAddress } from "../models/user-address.model";

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TYPES.IUserRepository) private repository: IUserRepository,
    @inject(TYPES.IUserAddressService) private addressService: IUserAddressService,
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

  getByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.repository.getByEmail(email)
        .then(async (result: User) => {
          const _result: any = result;
          _result.address = await this.addressService.getByUserId(result.id);
          resolve(_result);
        }).catch(async (error: any) =>
          reject(await this.log.critical('User', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: User) => {
          result.image = undefined;
          resolve(result)
        })
        .catch(async (error: any) =>
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
          if (!Attributes.isValid(found)) {
            user.password = Attributes.isValid(user.password) ? Crypto.encrypt(user.password, CryptoType.PASSWORD) : undefined;
            this.repository.save(user)
              .then(async (result: User) => {
                if (user.address) {
                  const address: UserAddress = new UserAddress(user.address);
                  address.userId = result.id;
                  await this.addressService.save(address);
                }
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
