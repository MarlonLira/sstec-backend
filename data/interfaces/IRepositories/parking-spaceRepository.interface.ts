import ParkingSpace from '../../models/parking-space.model';
import { Scheduling } from '../../models/scheduling.model';

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
   * @author Marlon Lira
   * @param {number} parkingId
   * @returns {Promise<ParkingSpace[]>}
   * @memberof IParkingSpaceRepository
   */
  GetByParkingId(parkingId: number): Promise<ParkingSpace[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Scheduling} scheduling
   * @returns {Promise<ParkingSpace[]>}
   * @memberof IParkingSpaceRepository
   */
  GetAvailable(scheduling: Scheduling): Promise<ParkingSpace[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof IParkingSpaceRepository
   */
  Delete(id: number): Promise<any>;

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _parkingId
   * @returns {Promise<any>}
   * @memberof IParkingSpaceRepository
   */
  ToGroupedList(parkingspace: ParkingSpace): Promise<ParkingSpace[]>;


  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof IParkingSpaceRepository
   */
  DeleteGroupType(parkingSpace: ParkingSpace): Promise<any>;
  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingSpace} _parkingspace
   * @returns {Promise<ParkingSpace[]>}
   * @memberof IParkingSpaceRepository
   */
  GetDeletedByParkingId(_parkingspace: ParkingSpace): Promise<ParkingSpace[]>;
}

export default IParkingSpaceRepository;