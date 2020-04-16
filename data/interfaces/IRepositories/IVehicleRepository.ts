import Vehicle from '../../models/vehicle';
import User from '../../models/user';

/**
 * @description
 * @author Marlon Lira
 * @interface IVehicleRepository
 */
interface IVehicleRepository {
  Save(vehicle: Vehicle, user: User): Promise<any>;
  GetVehicles(userId: number): Promise<Vehicle[]>;
  GetByLicensePlate(licensePlate: string): Promise<Vehicle>;
  Delete(id: number, user: User): Promise<any>;
  Update(vehicle: Vehicle): Promise<any>;
}

export default IVehicleRepository;