import ParkingPromotion from '../../models/parkingPromotion.model';

/**
 * @description
 * @author Felipe Seabra
 * @interface IParkingPromotionRepository
 */
interface IParkingPromotionRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {ParkingPromotion} parkingPromotion
   * @returns {Promise<any>}
   * @memberof IParkingPromotionRepository
   */
  Save(parkingPromotion: ParkingPromotion): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {ParkingPromotion} parkingPromotion
   * @returns {Promise<any>}
   * @memberof IParkingPromotionRepository
   */
  Update(parkingPromotion: ParkingPromotion): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @returns {Promise<ParkingPromotion[]>}
   * @memberof IParkingPromotionRepository
   */
  ToList(_parkingId: number): Promise<ParkingPromotion[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} name
   * @returns {Promise<ParkingPromotion[]>}
   * @memberof IParkingPromotionRepository
   */
  GetByName(name: string): Promise<ParkingPromotion[]>;

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<ParkingPromotion>}
   * @memberof IParkingPromotionRepository
   */
  GetById(id: number): Promise<ParkingPromotion>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof IParkingPromotionRepository
   */
  Delete(id: number): Promise<any>;
}

export default IParkingPromotionRepository;