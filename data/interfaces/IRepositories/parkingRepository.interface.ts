import Parking from '../../models/parking.model';

/**
 * @description
 * @author Emerson Souza
 * @interface IParkingRepository
 */
export interface IParkingRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @returns {Promise<any>}
   * @memberof IParkingRepository
   */
  save(parking: Parking): Promise<any>;

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @returns {Promise<any>}
   * @memberof IParkingRepository
   */
  update(parking: Parking): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _companyId
   * @returns {Promise<Parking[]>}
   * @memberof IParkingRepository
   */
  toList(_companyId: number, page: number, limiter: number): Promise<Parking[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<Parking[]>}
   * @memberof IParkingRepository
   */
  getById(id: number): Promise<Parking>;

  /**
   * @description
   * @author Emerson Souza
   * @param {string} registryCode
   * @returns {Promise<Parking>}
   * @memberof IParkingRepository
   */
  getByRegistryCode(companyId: number, registryCode: string): Promise<Parking[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _employeeId
   * @returns {Promise<Parking[]>}
   * @memberof IParkingRepository
   */
  getByEmployeeId(_employeeId: number): Promise<Parking[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof IParkingRepository
   */
  delete(id: number): Promise<any>;
}