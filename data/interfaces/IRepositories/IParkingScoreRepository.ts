import Parking from '../../models/parking';
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
   * @param {Parking} parking
   * @returns {Promise<any>}
   * @memberof IParkingScoreRepository
   */
  Save(parkingScore: ParkingScore, parking:Parking): Promise<any>;

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
  ToList(_parkingId:number): Promise<ParkingScore[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<ParkingScore>}
   * @memberof IParkingScoreRepository
   */
  GetById(id: number): Promise<ParkingScore>;

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