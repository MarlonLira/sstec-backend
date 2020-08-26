import Employee from '../../models/employee.model';

export interface IEmployeeService {

  getByName(name: string, parkingId: number, companyId: number): Promise<Employee[]>;

  getByRegistryCode(_registryCode: string): Promise<Employee>;

  getByEmail(_email: string): Promise<Employee>;

  getByCompanyId(_companyId: number): Promise<Employee[]>;

  getById(id: number): Promise<Employee>;

  getByParkingId(_parkingId: number): Promise<Employee[]>;

  toList(): Promise<Employee[]>;

  save(employee : Employee) : Promise<any>;

  update(employee : Employee): Promise<any>;

  delete(id: number): Promise<any>;
}