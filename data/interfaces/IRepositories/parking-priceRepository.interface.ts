import {ParkingPrice} from '../../models/parking-price.model';

export interface IParkingPriceRepository{
  save(parkingPrice: ParkingPrice): Promise<any>;
  update(parkingPrice: ParkingPrice): Promise<any>;
  getById(id: number): Promise<ParkingPrice>;
  delete(id: number): Promise<any>;
  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingPrice} parkingPrice
   * @returns {Promise<any>}
   * @memberof IParkingPriceRepository
   */
  deleteGroupType(parkingPrice: ParkingPrice): Promise<any>;
  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<ParkingPrice[]>}
   * @memberof IParkingPriceRepository
   */
  getByParkingId(id: number): Promise<ParkingPrice[]>;
}