import { Employee } from '../../models/employee.model';

export interface IEmployeeRepository {
  getByName(name: string, parkingId: number, companyId: number): Promise<Employee[]>;
  getByRegistryCode(_registryCode: string): Promise<Employee>;
  getByEmail(_email: string): Promise<Employee>;
  getById(id: number): Promise<Employee>;
  getByParkingId(parkingId: number): Promise<Employee[]>;
  getByCompanyId(companyId: number): Promise<Employee[]>;
  save(employee: Employee): Promise<any>;
  update(employee: Employee): Promise<any>;
  delete(id: number): Promise<any>;
}