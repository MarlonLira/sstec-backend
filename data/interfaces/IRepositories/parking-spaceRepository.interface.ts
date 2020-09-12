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
  save(parkingSpace: ParkingSpace): Promise<any>;

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof IParkingSpaceRepository
   */
  update(parkingSpace: ParkingSpace): Promise<any>;

  /**
   * @description
   * @author Emerson Souza
   * @returns {Promise<ParkingSpace[]>}
   * @memberof IParkingSpaceRepository
   */
  toList(parkingId: number): Promise<ParkingSpace[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<ParkingSpace>}
   * @memberof IParkingSpaceRepository
   */
  getById(id: number): Promise<ParkingSpace>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<ParkingSpace[]>}
   * @memberof IParkingSpaceRepository
   */
  getByParkingId(id: number): Promise<ParkingSpace[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Scheduling} scheduling
   * @returns {Promise<ParkingSpace[]>}
   * @memberof IParkingSpaceRepository
   */
  getAvailable(scheduling: Scheduling): Promise<ParkingSpace[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof IParkingSpaceRepository
   */
  delete(id: number): Promise<any>;

  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof IParkingSpaceRepository
   */
  deleteGroupType(parkingSpace:ParkingSpace): Promise<any>;

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingSpace} _parkingspace
   * @returns {Promise<ParkingSpace[]>}
   * @memberof IParkingSpaceRepository
   */
 getDeletedByParkingId(_parkingspace: ParkingSpace): Promise<ParkingSpace[]>;
}

export default IParkingSpaceRepository;