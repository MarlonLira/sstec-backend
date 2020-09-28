import { Parking } from '../../models/parking.model';

export interface IParkingRepository {
  save(parking: Parking): Promise<any>;
  update(parking: Parking): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<Parking>;
  getByRegistryCode(companyId: number, registryCode: string): Promise<Parking[]>;
  getByEmployeeId(_employeeId: number): Promise<Parking[]>;
  getByCompanyId(_companyId: number): Promise<Parking[]>;
  toList(): Promise<Parking[]>;
}