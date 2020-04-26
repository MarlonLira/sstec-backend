import Parking from '../../models/parking';
import ParkingSpace from '../../models/parkingSpace';

/**
 * @description
 * @author Emerson Souza
 * @interface IParkingSpaceRepository
 */
interface IParkingSpaceRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof IParkingSpaceRepository
   */
  Save(parkingSpace: ParkingSpace): Promise<any>;

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof IParkingSpaceRepository
   */
  Update(parkingSpace: ParkingSpace): Promise<any>;

  /**
   * @description
   * @author Emerson Souza
   * @returns {Promise<ParkingSpace[]>}
   * @memberof IParkingSpaceRepository
   */
  ToList(): Promise<ParkingSpace[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<ParkingSpace>}
   * @memberof IParkingSpaceRepository
   */
  GetById(id: number): Promise<ParkingSpace>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof IParkingSpaceRepository
   */
  Delete(id: number): Promise<any>;
}

export default IParkingSpaceRepository;