import { injectable } from "inversify";

import { ILogRepository } from "../interfaces/IRepositories/logRepository.interface";
import { Log } from "../models/log.model";
import { Op } from 'sequelize';

@injectable()
export class LogRepository implements ILogRepository {

  save(log: Log): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Log.sequelize.transaction();
      Log.create(log, { transaction: _transaction })
        .then(async (createdLog: Log) => {
          await _transaction.commit();
          resolve({ "logId": createdLog.id })
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error)
        });
    });
  }

  toList(companyId: number): Promise<Log[]> {
    return new Promise((resolve, reject) => {
      Log.findAll({
        where: {
          companyId: {
            [Op.eq]: companyId
          },
        }
      })
        .then((foundLogs: Log[]) => {
          resolve(foundLogs);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}