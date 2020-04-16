import { injectable } from "inversify";

import IParkingSpaceRepository from '../interfaces/IRepositories/IParkingSpaceRepository';
import Parking from '../models/Parking';
import ParkingSpace from '../models/ParkingSpace';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from "../../commons/enums/transactionType";

@injectable()
class ParkingSpaceRepository implements IParkingSpaceRepository {

  Save(parkingSpace: ParkingSpace, parkingId: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpace.sequelize.transaction();
      Parking.findByPk(parkingId)
        .then((parking: Parking) => {
          parkingSpace.status = TransactionType.ACTIVE;
          ParkingSpace.create(parkingSpace, { transaction: _transaction })
            .then((createParkingSpace: ParkingSpace) => {
              _transaction.commit();
              resolve({ "parkingSpaceId": createParkingSpace.id });
            }).catch(error => {
              _transaction.rollback();
              reject(error);
            });
        });
    });
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