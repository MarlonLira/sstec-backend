import Parking from '../../models/parking';

/**
 * @description
 * @author Emerson Souza
 * @interface IParkingRepository
 */
interface IParkingRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @returns {Promise<any>}
   * @memberof IParkingRepository
   */
  Save(parking: Parking): Promise<any>;

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @returns {Promise<any>}
   * @memberof IParkingRepository
   */
  Update(parking: Parking): Promise<any>;

  /**
   * @description
   * @author Emerson Souza
   * @returns {Promise<any>}
   * @memberof IParkingRepository
   */
  ToList(): Promise<Parking[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<Parking[]>}
   * @memberof IParkingRepository
   */
  GetById(id: number): Promise<Parking>;

  /**
   * @description
   * @author Emerson Souza
   * @param {string} registryCode
   * @returns {Promise<Parking>}
   * @memberof IParkingRepository
   */
  GetByRegistryCode(registryCode: string): Promise<Parking>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof IParkingRepository
   */
  Delete(id: number): Promise<any>;
}

export default IParkingRepository;