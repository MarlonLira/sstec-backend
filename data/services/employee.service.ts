import { injectable, inject } from "inversify";
import IEmployeeRepository from "../interfaces/IRepositories/employeeRepository.interface";
import TYPES from "../types";
import { IEmployeeService } from "../interfaces/IServices/employeeService.interface";
import Employee from "../models/employee.model";
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
    throw new Error("Method not implemented.");
  }

  getByEmail(_email: string): Promise<Employee> {
    throw new Error("Method not implemented.");
  }

  getByCompanyId(_companyId: number): Promise<Employee[]> {
    throw new Error("Method not implemented.");
  }

  getByParkingId(_parkingId: number): Promise<Employee[]> {
    throw new Error("Method not implemented.");
  }

  toList(): Promise<Employee[]> {
    throw new Error("Method not implemented.");
  }

  save(employee: Employee): Promise<any> {
    throw new Error("Method not implemented.");
  }

  update(employee: Employee): Promise<any> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<Employee> {
    return new Promise((resolve, reject) => {
      this.repository.GetById(id)
        .then(async (result: Employee) => {
          const _result: any = result.ToModify();
          resolve(_result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }
}
