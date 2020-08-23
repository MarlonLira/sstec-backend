import ParkingAdress from '../../models/parking-adress.model';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IParkingAdressRepository
 */
export interface IParkingAdressRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {ParkingAdress} parkingAdress
   * @returns {Promise <any>}
   * @memberof IParkingAdressRepository
   */
  save(parkingAdress: ParkingAdress): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {ParkingAdress} parkingAdress
   * @returns {Promise <any>}
   * @memberof IParkingAdressRepository
   */
  update(parkingAdress: ParkingAdress): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise <ParkingAdress>}
   * @memberof IParkingAdressRepository
   */
  getById(id: number): Promise<ParkingAdress>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} parkingId
   * @returns {Promise<ParkingAdress>}
   * @memberof IParkingAdressRepository
   */
  getByParkingId(parkingId: number): Promise<ParkingAdress>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise <any>}
   * @memberof IParkingAdressRepository
   */
  delete(id: number): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {*} _parkingId
   * @returns {Promise <ParkingAdress[]>}
   * @memberof IParkingAdressRepository
   */
  toList(_parkingId): Promise<ParkingAdress[]>
}