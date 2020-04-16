import Vehicle from '../../models/vehicle';

/**
 * @description
 * @author Marlon Lira
 * @interface IVehicleRepository
 */
interface IVehicleRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {Vehicle} vehicle
   * @returns {Promise<any>}
   * @memberof IVehicleRepository
   */
  Save(vehicle: Vehicle): Promise<any>;


  /**
   * @description
   * @author Marlon Lira
   * @param {number} userId
   * @returns {Promise<Vehicle[]>}
   * @memberof IVehicleRepository
   */
  GetVehicles(userId: number): Promise<Vehicle[]>;
  GetById(id: number): Promise<Vehicle[]>

  /**
   * @description
   * @author Marlon Lira
   * @param {number} userId
   * @returns {Promise<Vehicle[]>}
   * @memberof IVehicleRepository
   */
  GetByUserId(userId: number): Promise<Vehicle[]>;
  GetByLicensePlate(licensePlate: string): Promise<Vehicle>;
  Delete(id: number): Promise<any>;
  Update(vehicle: Vehicle): Promise<any>;
}

export default IVehicleRepository;