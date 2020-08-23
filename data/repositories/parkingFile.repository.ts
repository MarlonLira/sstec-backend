import { injectable } from "inversify";
import { IParkingFileRepository } from "../interfaces/IRepositories/parkingFileRepository.interface";
import { ParkingFile } from "../models/parking-file.model";
import { Op } from 'sequelize';

@injectable()
export class ParkingFileRepository implements IParkingFileRepository {

  getById(id: number): Promise<ParkingFile> {
    throw new Error("Method not implemented.");
  }

  toList(parkingId: number): Promise<ParkingFile[]> {
    return new Promise((resolve, reject) => {
      ParkingFile.findAll({
        where: {
          parkingId: {
            [Op.eq]: parkingId
          }
        }
      })
        .then((result: ParkingFile[]) => resolve(result))
        .catch(error => reject(error));
    });
  }

  save(file: ParkingFile): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFile.sequelize.transaction();
      ParkingFile.create(file, { transaction: _transaction })
        .then(async (result: ParkingFile) => {
          await _transaction.commit();
          resolve(result.id);
        }).catch(async error => {
          await _transaction.rollback();
          reject(error.message);
        });
    });
  }
}