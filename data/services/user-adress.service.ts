import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IUserAdressRepository } from "../interfaces/IRepositories/user-adressRepository.interface";
import { IUserAdressService } from "../interfaces/IServices/user-adressService.interface";
import { UserAdress } from "../models/user-adress.model";

@injectable()
export class UserAdressService implements IUserAdressService {

  constructor(
    @inject(TYPES.IUserAdressRepository) private repository: IUserAdressRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  save(userAdress: UserAdress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(userAdress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User Adress', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(userAdress: UserAdress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(userAdress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User Adress', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<UserAdress> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: UserAdress) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User Adress', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByUserId(id: number): Promise<UserAdress> {
    return new Promise((resolve, reject) => {
      this.repository.getByUserId(id)
        .then((result: UserAdress) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('User Adress', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
