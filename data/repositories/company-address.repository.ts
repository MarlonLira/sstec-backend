import { injectable } from "inversify";
import { Op } from 'sequelize';

import { CompanyAddress } from '../models/company-address.model';
import { TransactionType } from '../../commons/enums/transactionType';
import { ICompanyAddressRepository } from "../interfaces/IRepositories/company-addressRepository.interface";

@injectable()
export class CompanyAddressRepository implements ICompanyAddressRepository {

  getByCompanyId(companyId: number): Promise<CompanyAddress> {
    return new Promise((resolve, reject) => {
      CompanyAddress.findOne({
        where: {
          companyId: { [Op.eq]: companyId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      }
      ).then((result: CompanyAddress) => resolve(result)
      ).catch((error: any) => reject(error));
    });
  }

  update(companyAddress: CompanyAddress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAddress.sequelize.transaction();
      CompanyAddress.update(companyAddress.ToModify(),
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
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAddress.sequelize.transaction();
      CompanyAddress.destroy({
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

  save(companyAddress: CompanyAddress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAddress.sequelize.transaction();
      companyAddress.status = TransactionType.ACTIVE;
      CompanyAddress.create(companyAddress, { transaction: _transaction })
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