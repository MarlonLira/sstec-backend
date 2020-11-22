import { injectable } from "inversify";
import { IParkingFileRepository } from "../interfaces/IRepositories/parkingFileRepository.interface";
import { ParkingFile, ParkingFileDAO } from "../models/parking-file.model";
import { Op } from 'sequelize';

@injectable()
export class ParkingFileRepository implements IParkingFileRepository {

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFileDAO.sequelize.transaction();
      ParkingFileDAO.destroy({
        where: {
          id: { [Op.eq]: id }
        },
        transaction: _transaction
      })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  getById(id: number): Promise<ParkingFile> {
    throw new Error("Method not implemented.");
  }

  toList(parkingId: number): Promise<ParkingFile[]> {
    return new Promise((resolve, reject) => {
      ParkingFileDAO.findAll({
        where: {
          parkingId: { [Op.eq]: parkingId }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  save(file: ParkingFile): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingFileDAO.sequelize.transaction();
      ParkingFileDAO.create(file, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
}