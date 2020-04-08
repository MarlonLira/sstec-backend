import Vehicle from '../../models/vehicle';

/**
 * @description
 * @author Marlon Lira
 * @interface IVehicleRepository
 */
interface IVehicleRepository {
  Save(vehicle: Vehicle, userId: number);
  Find(licensePlate: string, userId: number);
  GetVehicles(userId: number);
}

export default IVehicleRepository;