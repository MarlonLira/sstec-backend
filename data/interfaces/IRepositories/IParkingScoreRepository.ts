import Parking from '../../models/parking';
import User from '../../models/user';
import ParkingScore from '../../models/parkingScore';

/**
 * @description
 * @author Emerson Souza
 * @interface IParkingScoreRepository
 */
interface IParkingScoreRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingScore} parkingScore
   * @returns {Promise<any>}
   * @memberof IParkingScoreRepository
   */
  Save(parkingScore: ParkingScore): Promise<any>;

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingScore} parkingScore
   * @returns {Promise<any>}
   * @memberof IParkingScoreRepository
   */
  Update(parkingScore: ParkingScore): Promise<any>;

  /**
   * @description
   * @author Emerson Souza
   * @returns {Promise<ParkingScore[]>}
   * @memberof IParkingScoreRepository
   */
  ToList(): Promise<ParkingScore[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<ParkingScore>}
   * @memberof IParkingScoreRepository
   */
  GetByParkingScoreId(id: number): Promise<ParkingScore>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof IParkingScoreRepository
   */
  Delete(id: number): Promise<any>;
}

export default IParkingScoreRepository;