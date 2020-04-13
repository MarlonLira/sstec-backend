import { Op } from 'sequelize';
import { injectable } from "inversify";

import IParkingSpaceRepository from '../interfaces/IRepositories/IParkingSpaceRepository';
import Parking from '../models/Parking';
import ParkingSpace from '../models/ParkingSpace';
import Attributes from '../../commons/core/attributes';


@injectable()
class ParkingSpaceRepository implements IParkingSpaceRepository {
  Save(parkingSpace: Parking, parking: number) {
    throw new Error("Method not implemented.");
  }
  Update(parkingSpace: Parking) {
    throw new Error("Method not implemented.");
  }
  ToList() {
    throw new Error("Method not implemented.");
  }
  GetByRegistryCode(registryCode: string) {
    throw new Error("Method not implemented.");
  }
  Delete(id: number) {
    throw new Error("Method not implemented.");
  }
  Find(parkingSpace: Parking, properties: string[]) {
    throw new Error("Method not implemented.");
  }
}

export default ParkingSpaceRepository;