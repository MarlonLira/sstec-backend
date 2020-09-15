import { injectable, inject, id } from "inversify";
import { IEmployeeRepository } from "../interfaces/IRepositories/employeeRepository.interface";
import TYPES from "../types";
import { IEmployeeService } from "../interfaces/IServices/employeeService.interface";
import { Employee } from "../models/employee.model";
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";

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
        .then(async (result: Employee) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  getByEmail(_email: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      this.repository.getByEmail(_email)
        .then(async (result: Employee) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  getByCompanyId(_companyId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByCompanyId(_companyId)
        .then(async (result: Employee[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  getByParkingId(_parkingId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(_parkingId)
        .then(async (result: Employee[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))))
    })
  }

  save(employee: Employee): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(employee)
        .then(async (result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  update(employee: Employee): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(employee)
        .then(async (result: any) => {
          const _employee: Employee = new Employee(employee.id);
          if (Attributes.IsValid(id) && employee.id > 0) {
            await this.repository.update(employee);
          } else {
            _employee.id = employee.id;
            await this.repository.save(_employee);
          }
          resolve(result)
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))))
    })
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))))
    })
  }

  getById(id: number): Promise<Employee> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: Employee) => {
          const _result: any = result.ToModify();
          _result.password = undefined;
          resolve(_result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }
}
