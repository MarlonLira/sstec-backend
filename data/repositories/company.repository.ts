import { Op } from 'sequelize';

import { ICompanyRepository } from '../interfaces/IRepositories/companyRepository.interface';
import { Company, CompanyDAO } from '../models/company.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';
import { CompanyAddressDAO } from '../models/company-address.model';

@injectable()
export class CompanyRepository implements ICompanyRepository {

  save(company: Company): Promise<Company> {
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

  update(company: Company): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyDAO.sequelize.transaction();
      CompanyDAO.update(company,
        {
          where: {
            id: { [Op.eq]: company.id }
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

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyDAO.sequelize.transaction();
      CompanyDAO.update({ status: TransactionType.DELETED },
        {
          where: {
            id: { [Op.eq]: _id }
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

  getByRegistryCode(registryCode: string): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      CompanyDAO.findAll({
        where: {
          registryCode: { [Op.like]: `${registryCode}%` },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<Company> {
    return new Promise((resolve, reject) => {
      CompanyDAO.findByPk(id,
        {
          include: [
            { model: CompanyAddressDAO, as: 'address', where: { status: { [Op.ne]: TransactionType.DELETED } }, required: false }
          ]
        })
        .then((result: any) => resolve(new Company(result)))
        .catch((error: any) => reject(error));
    });
  }
}