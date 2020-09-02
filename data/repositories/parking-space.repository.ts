import { injectable } from "inversify";
import { Op, QueryTypes, Sequelize } from 'sequelize';

import IParkingSpaceRepository from '../interfaces/IRepositories/parking-spaceRepository.interface';
import ParkingSpace from '../models/parking-space.model';
import { TransactionType } from "../../commons/enums/transactionType";
import Scheduling from '../models/scheduling.model';

@injectable()
class ParkingSpaceRepository implements IParkingSpaceRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof ParkingSpaceRepository
   */
  Save(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpace.sequelize.transaction();
      parkingSpace.status = TransactionType.ACTIVE;
      ParkingSpace.create(parkingSpace, { transaction: _transaction })
        .then(async (createParkingSpace: ParkingSpace) => {
          await _transaction.commit();
          resolve({ "parkingSpaceId": createParkingSpace.id });
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof ParkingSpaceRepository
   */
  Update(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpace.sequelize.transaction();
      ParkingSpace.update(parkingSpace.ToModify(),
        {
          where:
          {
            id: parkingSpace.id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof ParkingSpaceRepository
   */
  Delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpace.sequelize.transaction();
      ParkingSpace.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: _id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.commit();
          reject(error);
        });
    });
  }

  /**
    * @description
    * @author Felipe Seabra 
    * @param {ParkingSpace} parkingSpace
    * @returns {Promise<any>}
    * @memberof ParkingSpaceRepository
    */
  DeleteGroupType(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpace.sequelize.transaction();
      ParkingSpace.update({
        status: TransactionType.DELETED,
      },
        {
          where: {
            type: {
              [Op.eq]: parkingSpace.type
            },
            parkingId: {
              [Op.eq]: parkingSpace.parkingId,
            },
            status: {
              [Op.eq]: TransactionType.ACTIVE
            }
          },
          limit: Number(parkingSpace.amount),
          transaction: _transaction,
          validate: false
        })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Scheduling} scheduling
   * @returns {Promise<ParkingSpace[]>}
   * @memberof ParkingSpaceRepository
   */
  GetAvailable(scheduling: Scheduling): Promise<ParkingSpace[]> {
    return new Promise(async (resolve, reject) => {
      ParkingSpace.sequelize.query(
        "   SELECT PS.* FROM ParkingSpace AS PS" +
        "   WHERE NOT EXISTS ( SELECT PS1.* FROM ParkingSpace AS PS1" +
        "                      INNER JOIN Scheduling AS S1" +
        "                       ON S1.PARKINGSPACEID = PS1.ID" +
        "                      WHERE S1.STATUS NOT IN ('EX', 'PD')" +
        "                       AND S1.DATE = :date" +
        "                       AND S1.PARKINGID = :parkingId" +
        "                       AND PS1.PARKINGID = :parkingId" +
        "                       AND PS.ID = PS1.ID" +
        "                       AND (( S1.AVALIABLETIME BETWEEN :avaliableTime AND :unavailableTime" +
        "                             OR S1.UNAVAILABLETIME BETWEEN :avaliableTime AND :unavailableTime )" +
        "                             OR (S1.AVALIABLETIME < :avaliableTime AND S1.UNAVAILABLETIME > :unavailableTime )))" +
        "     AND PS.STATUS NOT IN ('EX', 'PD')" +
        "     AND PS.PARKINGID = :parkingId" +
        "     AND PS.TYPE = :type",
        {
          replacements: {
            date: scheduling.date,
            avaliableTime: scheduling.avaliableTime,
            unavailableTime: scheduling.unavailableTime,
            type: scheduling.vehicleType,
            parkingId: scheduling.parkingId
          },
          type: QueryTypes.SELECT,
          mapToModel: true
        }
      )
        .then((result: ParkingSpace[]) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {number} _parkingId
   * @returns {Promise<ParkingSpace[]>}
   * @memberof ParkingSpaceRepository
   */
  ToGroupedList(_parkingspace: ParkingSpace): Promise<ParkingSpace[]> {
    return new Promise(async (resolve, reject) => {
      ParkingSpace.findAll({
        where: {
          parkingId: { [Op.eq]: _parkingspace.parkingId },
          status: { [Op.eq]: TransactionType.ACTIVE },
        },
        group: ['type', 'value'],
        attributes: ['value', 'type', [Sequelize.fn('COUNT', Sequelize.col('type')), 'amount']],
        raw: true
      }).then((parkingSpace: ParkingSpace[]) => {
        resolve(parkingSpace);
      })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<ParkingSpace>}
   * @memberof ParkingSpaceRepository
   */
  GetById(id: number): Promise<ParkingSpace> {
    return new Promise((resolve, reject) => {
      ParkingSpace.findByPk(id)
        .then((parkingSpace: ParkingSpace) => {
          resolve(parkingSpace)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} parkingId
   * @returns {Promise<ParkingSpace[]>}
   * @memberof ParkingSpaceRepository
   */
  GetByParkingId(_parkingId: number): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      ParkingSpace.findAll(
        {
          where:
          {
            parkingId: _parkingId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          },
        })
        .then((parkingSpace: ParkingSpace[]) => {
          resolve(parkingSpace)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingSpace} _parkingspace
   * @returns {Promise<any>}
   * @memberof ParkingSpaceRepository
   */
  GetDeletedByParkingId(_parkingspace: ParkingSpace): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      ParkingSpace.findAll(
        {
          where:
          {
            parkingId: _parkingspace.parkingId,
            type: {
              [Op.eq]: _parkingspace.type,
            },
            status: {
              [Op.eq]: TransactionType.DELETED
            }
          },
          limit: Number(_parkingspace.amount)
        })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @returns {Promise<ParkingSpace[]>}
   * @memberof ParkingSpaceRepository
   */
  ToList(): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      ParkingSpace.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingSpace[]) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default ParkingSpaceRepository;