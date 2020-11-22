import { Op, QueryTypes } from 'sequelize';
import { injectable } from "inversify";

import { IParkingRepository } from '../interfaces/IRepositories/parkingRepository.interface';
import { Parking, ParkingDAO } from '../models/parking.model';
import { TransactionType } from '../../commons/enums/transactionType';
import { ParkingAddress, ParkingAddressDAO } from '../models/parking-address.model';
import { Employee, EmployeeDAO } from '../models/employee.model';

@injectable()
export class ParkingRepository implements IParkingRepository {

  toList(): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      ParkingDAO.findAll({
        include: [{ model: ParkingAddressDAO, as: 'address' }]
      })
        .then((parking: any) => resolve(parking))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<Parking> {
    return new Promise((resolve, reject) => {
      ParkingDAO.findByPk(id,
        {
          include: [{ model: ParkingAddressDAO, as: 'address' }]
        })
        .then((parking: any) => resolve(new Parking(parking)))
        .catch((error: any) => reject(error));
    });
  }

  save(parking: Parking): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingDAO.sequelize.transaction();
      parking.status = TransactionType.ACTIVE;
      ParkingDAO.create(parking, { transaction: _transaction })
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

  update(parking: Parking): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingDAO.sequelize.transaction();
      ParkingDAO.update(parking,
        {
          where:
          {
            id: { [Op.eq]: parking.id }
          },
          transaction: _transaction,
          validate: false
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

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingDAO.sequelize.transaction();
      ParkingDAO.update({ status: TransactionType.DELETED },
        {
          where: {
            id: { [Op.eq]: _id }
          },
          transaction: _transaction,
          validate: false
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

  getByRegistryCode(companyId: number, registryCode: string): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      ParkingDAO.findAll({
        where: {
          registryCode: {
            [Op.eq]: registryCode
          },
          companyId: {
            [Op.eq]: companyId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByEmployeeId(_employeeId: number): Promise<Parking> {
    return new Promise((resolve, reject) => {
      ParkingDAO.findOne({
        include: [
          {
            attributes: { exclude: ['password', 'image'] },
            model: EmployeeDAO, as: 'employees',
            where: {
              id: { [Op.eq]: _employeeId }
            }
          }],
        where: {
          status: { [Op.ne]: TransactionType.DELETED }
        },
        raw: true,
        nest: true
      })
        .then((result: any) => resolve(new Parking(result)))
        .catch((error: any) => reject(error));
    });
  }

  getByCompanyId(_companyId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      ParkingDAO.findAll({
        include: [{ model: ParkingAddressDAO, as: 'address' }],
        where: {
          companyId: { [Op.eq]: _companyId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }
}