import Parking from '../../models/parking';

export interface IParkingService {

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<Parking>}
   * @memberof IParkingService
   */
  getById(id: number): Promise<Parking>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Parking} parking
   * @returns {Promise<any>}
   * @memberof IParkingService
   */
  save(parking: Parking): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Parking} parking
   * @returns {Promise<any>}
   * @memberof IParkingService
   */
  update(parking: Parking): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _id
   * @returns {Promise<any>}
   * @memberof IParkingService
   */
  delete(id: number): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} registryCode
   * @returns {Promise<Parking[]>}
   * @memberof IParkingService
   */
  getByRegistryCode(parking: Parking): Promise<Parking[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _employeeId
   * @returns {Promise<Parking[]>}
   * @memberof IParkingService
   */
  getByEmployeeId(employeeId: number): Promise<Parking[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _companyId
   * @returns {Promise<Parking[]>}
   * @memberof IParkingService
   */
  toList(companyId: number): Promise<Parking[]>;

}