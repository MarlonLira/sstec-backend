import Vehicle from '../../models/vehicle.model';

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
   * @param {number} id
   * @returns {Promise<Vehicle[]>}
   * @memberof IVehicleRepository
   */
  GetById(id: number): Promise<Vehicle>

  /**
   * @description
   * @author Marlon Lira
   * @param {number} userId
   * @returns {Promise<Vehicle[]>}
   * @memberof IVehicleRepository
   */
  GetByUserId(userId: number): Promise<Vehicle[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} licensePlate
   * @returns {Promise<Vehicle>}
   * @memberof IVehicleRepository
   */
  GetByLicensePlate(licensePlate: string): Promise<Vehicle>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof IVehicleRepository
   */
  Delete(id: number): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Vehicle} vehicle
   * @returns {Promise<any>}
   * @memberof IVehicleRepository
   */
  Update(vehicle: Vehicle): Promise<any>;
}

export default IVehicleRepository;