import Vehicle from '../../models/vehicle';

/**
 * @description
 * @author Marlon Lira
 * @interface IVehicleRepository
 */
interface IVehicleRepository {
  Save(vehicle : Vehicle);
  Find(vehicle: Vehicle, properties: string[]);
}

export default IVehicleRepository;