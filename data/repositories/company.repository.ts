import { Op } from 'sequelize';

import { ICompanyRepository } from '../interfaces/IRepositories/companyRepository.interface';
import { Company, CompanyDAO } from '../models/company.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class CompanyRepository implements ICompanyRepository {

  save(company: Company) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyDAO.sequelize.transaction();
      company.status = TransactionType.ACTIVE;
      CompanyDAO.create(company, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Company(result));
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(company: Company) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyDAO.sequelize.transaction();
      CompanyDAO.update(company,
        {
          where: {
            id: company.id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Company(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(_id: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyDAO.sequelize.transaction();
      CompanyDAO.update({ status: TransactionType.DELETED },
        {
          where: { id: _id },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Company(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  getByRegistryCode(registryCode: string): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      CompanyDAO.findAll({
        where: {
          registryCode: {
            [Op.like]: `${registryCode}%`
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((foundCompany: any) => {
          resolve(foundCompany);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getById(id: number) {
    return new Promise((resolve, reject) => {
      CompanyDAO.findByPk(id)
        .then((result: any) => resolve(new Company(result)))
        .catch((error : any) => reject(error));
    });
  }
}