import { injectable } from "inversify";
import { Op } from 'sequelize';

import { CompanyAddress, CompanyAddressDAO } from '../models/company-address.model';
import { TransactionType } from '../../commons/enums/transactionType';
import { ICompanyAddressRepository } from "../interfaces/IRepositories/company-addressRepository.interface";

@injectable()
export class CompanyAddressRepository implements ICompanyAddressRepository {

  getByCompanyId(companyId: number): Promise<CompanyAddress> {
    return new Promise((resolve, reject) => {
      CompanyAddressDAO.findOne({
        where: {
          companyId: { [Op.eq]: companyId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      }
      ).then((result: any) => resolve(new CompanyAddress(result))
      ).catch((error: any) => reject(error));
    });
  }

  update(companyAddress: CompanyAddress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAddressDAO.sequelize.transaction();
      CompanyAddressDAO.update(companyAddress,
        {
          where:
          {
            id: { [Op.eq]: companyAddress.id }
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new CompanyAddress(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAddressDAO.sequelize.transaction();
      CompanyAddressDAO.destroy({
        where: {
          id: { [Op.eq]: id }
        },
        transaction: _transaction
      })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new CompanyAddress(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  save(companyAddress: CompanyAddress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAddressDAO.sequelize.transaction();
      companyAddress.status = TransactionType.ACTIVE;
      CompanyAddressDAO.create(companyAddress, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new CompanyAddress(result));
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
}