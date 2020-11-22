import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IEmployeeRepository } from '../interfaces/IRepositories/employeeRepository.interface';
import { Employee, EmployeeDAO } from '../models/employee.model';
import { TransactionType } from '../../commons/enums/transactionType';
import { Parking, ParkingDAO } from '../models/parking.model';
import { Company, CompanyDAO } from '../models/company.model';
import { Rule, RuleDAO } from '../models/rule.model';
import { Attributes } from '../../commons/core/attributes';

@injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private _attributes = ['id', 'status', 'name', 'registryCode', 'phone', 'email', 'about', 'image', 'parkingId', 'companyId', 'ruleId']

  save(employee: Employee): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await EmployeeDAO.sequelize.transaction();
      employee.status = TransactionType.ACTIVE;
      EmployeeDAO.create(employee, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Employee(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  getByName(name: string, _parkingId: number = 0, _companyId: number = 0): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      EmployeeDAO.findAll({
        attributes: this._attributes,
        where: {
          name: {
            [Op.like]: `%${name}%`
          },
          [Op.or]: [{ parkingId: _parkingId }, { companyId: _companyId }],
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByRegistryCode(_registryCode: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      EmployeeDAO.findOne({
        attributes: this._attributes,
        where: {
          registryCode: {
            [Op.eq]: _registryCode
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: any) => resolve(new Employee(result)))
        .catch((error: any) => reject(error));
    });
  }

  getByEmail(_email: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      EmployeeDAO.findOne({
        attributes: { exclude: ['image'] },
        include: [
          { model: ParkingDAO, as: 'parking' },
          { model: CompanyDAO, as: 'company', attributes: { exclude: ['image'] } },
          { model: RuleDAO, as: 'rule' },
        ],
        where: {
          email: {
            [Op.eq]: _email
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        },
        raw: true,
        nest: true
      }).then((result: any) => resolve(new Employee(result)))
        .catch((error: any) => reject(error));
    });
  }

  getByCompanyId(_companyId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      EmployeeDAO.findAll({
        attributes: this._attributes,
        where: {
          companyId: {
            [Op.eq]: _companyId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: any) => resolve(result)
      ).catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<Employee> {
    return new Promise((resolve, reject) => {
      EmployeeDAO.findByPk(id,
        {
          attributes: { exclude: ['password'] },
          include: [
            { model: RuleDAO, as: 'rule' },
            { model: CompanyDAO, as: 'company' }
          ],
          raw: true,
          nest: true
        })
        .then((result: any) => resolve(Attributes.encodeImage(new Employee(result))))
        .catch((error: any) => reject(error));
    });
  }

  getByParkingId(_parkingId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      EmployeeDAO.findAll({
        attributes: this._attributes,
        where: {
          parkingId: {
            [Op.eq]: _parkingId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  update(employee: Employee): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await EmployeeDAO.sequelize.transaction();
      EmployeeDAO.update(employee,
        {
          where:
          {
            id: employee.id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Employee(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await EmployeeDAO.sequelize.transaction();
      EmployeeDAO.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: _id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Employee(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback()
          reject(error);
        });
    });
  }
}
