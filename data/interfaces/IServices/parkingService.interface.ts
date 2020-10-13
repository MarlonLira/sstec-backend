import { Parking } from '../../models/parking.model';

export interface IParkingService {
  getById(id: number): Promise<Parking>;
  save(parking: Parking): Promise<any>;
  update(parking: Parking): Promise<any>;
  delete(id: number): Promise<any>;
  getByRegistryCode(parking: Parking): Promise<Parking[]>;
  getByEmployeeId(employeeId: number): Promise<Parking>;
  getByCompanyId(companyId: number): Promise<Parking[]>;
  toList(): Promise<Parking[]>;
}