import { injectable, inject } from "inversify";

import TYPES from "../types";
import Crypto from '../../commons/core/crypto';
import { IEmployeeRepository } from "../interfaces/IRepositories/employeeRepository.interface";
import { InnerException } from "../../commons/core/innerException";
import { IEmployeeService } from "../interfaces/IServices/employeeService.interface";
import { Employee } from "../models/employee.model";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { CryptoType } from "../../commons/enums/cryptoType";

@injectable()
export class EmployeeService implements IEmployeeService {

  constructor(
    @inject(TYPES.IEmployeeRepository) private repository: IEmployeeRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getByName(name: string, parkingId: number, companyId: number): Promise<Employee[]> {
    throw new Error("Method not implemented.");
  }

  getByRegistryCode(_registryCode: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      this.repository.getByEmail(_registryCode)
        .then((result: Employee) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByEmail(_email: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      this.repository.getByEmail(_email)
        .then((result: Employee) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByCompanyId(_companyId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByCompanyId(_companyId)
        .then((result: Employee[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByParkingId(_parkingId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(_parkingId)
        .then((result: Employee[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))))
    });
  }

  save(employee: Employee): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(employee)
        .then((result: any) => {
          result.password = Crypto.Encrypt(employee.password, CryptoType.PASSWORD);
          resolve(result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(employee: Employee): Promise<any> {
    return new Promise((resolve, reject) => {
      if (employee.password) {
        employee.password = Crypto.Encrypt(employee.password, CryptoType.PASSWORD);
      }

      this.repository.update(employee)
        .then(result => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))))
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))))
    });
  }

  getById(id: number): Promise<Employee> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: Employee) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
