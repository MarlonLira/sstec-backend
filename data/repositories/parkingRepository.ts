import { Op } from 'sequelize';
import { injectable } from "inversify";

import IParkingRepository from '../interfaces/IRepositories/IParkingRepository';
import Parking from '../models/Parking';
import Card from '../models/card';
import User from '../models/user';

/**
 * @description
 * @author Emerson Souza
 * @class ParkingRepository
 * @implements {IParkingRepository}
 */
@injectable()
class ParkingRepository implements IParkingRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @memberof ParkingRepository
   */
  Update(parking: Parking) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @memberof ParkingRepository
   */
  Delete(id: number) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @memberof ParkingRepository
   */
  Save(parking: Parking) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @param {string[]} properties
   * @memberof ParkingRepository
   */
  Find(parking: Parking, properties: string[]) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {string} parkingName
   * @memberof ParkingRepository
   */
  GetByName(parkingName: string) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {string} registryCode
   * @memberof ParkingRepository
   */
  GetByRegistryCode(registryCode: string) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @memberof ParkingRepository
   */
  ToList() {
    throw new Error("Method not implemented.");
  }
}

export default ParkingRepository;