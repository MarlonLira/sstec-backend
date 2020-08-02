import ParkingAdress from '../../models/parking-adress.model';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IParkingAdressService
 */
export interface IParkingAdressService {

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<ParkingAdress>}
   * @memberof IParkingAdressService
   */
  getById(id: number): Promise<ParkingAdress>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<ParkingAdress>}
   * @memberof IParkingAdressService
   */
  getByParkingId(id: number): Promise<ParkingAdress>;

  /**
   * @description
   * @author Marlon Lira
   * @param {ParkingAdress} parkingAdress
   * @returns {Promise<any>}
   * @memberof IParkingAdressService
   */
  save(parkingAdress: ParkingAdress): Promise<any>;

}