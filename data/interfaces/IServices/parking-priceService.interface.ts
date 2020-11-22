import {ParkingPrice} from '../../models/parking-price.model';

export interface IParkingPriceService{

  getById(id: number): Promise<ParkingPrice>;
  save(parkingPrice: ParkingPrice): Promise<any>;
  update(parkingPrice: ParkingPrice): Promise<any>;
  delete(id: number): Promise<any>;
  toList(parkingId: number): Promise<ParkingPrice[]>;
  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<ParkingPrice[]>}
   * @memberof IParkingPriceService
   */
  getByParkinkId(id: number): Promise<ParkingPrice[]>;
  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingPrice} parkingPrice
   * @returns {Promise<any>}
   * @memberof IParkingPriceService
   */
  deleteGroupType(parkingPrice: ParkingPrice): Promise<any>;
}