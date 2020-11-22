import { injectable } from "inversify";

import { ILogRepository } from "../interfaces/IRepositories/logRepository.interface";
import { Log, LogDAO } from "../models/log.model";
import { Op } from 'sequelize';

@injectable()
export class LogRepository implements ILogRepository {

  save(log: Log): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await LogDAO.sequelize.transaction();
      LogDAO.create(log, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Log(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error)
        });
    });
  }

  toList(companyId: number): Promise<Log[]> {
    return new Promise((resolve, reject) => {
      LogDAO.findAll({
        where: {
          companyId: { [Op.eq]: companyId },
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

}