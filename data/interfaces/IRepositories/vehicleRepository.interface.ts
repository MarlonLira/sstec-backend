import Vehicle from '../../models/vehicle.model';

/**
 * @description
 * @author Marlon Lira
 * @interface IVehicleRepository
 */
interface IVehicleRepository {

  save(vehicle: Vehicle): Promise<any>;

  getById(id: number): Promise<Vehicle>

  getByUserId(userId: number): Promise<Vehicle[]>;

  getByLicensePlate(licensePlate: string): Promise<Vehicle>;

  delete(id: number): Promise<any>;

  update(vehicle: Vehicle): Promise<any>;
}

export default IVehicleRepository;