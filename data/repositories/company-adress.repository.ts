import { injectable } from "inversify";
import { Op } from 'sequelize';

import { CompanyAdress } from '../models/company-adress.model';
import { TransactionType } from '../../commons/enums/transactionType';
import { ICompanyAdressRepository } from "../interfaces/IRepositories/company-adressRepository.interface";

@injectable()
export class CompanyAdressRepository implements ICompanyAdressRepository {

  getByCompanyId(companyId: number): Promise<CompanyAdress> {
    return new Promise((resolve, reject) => {
      CompanyAdress.findOne({
        where: {
          companyId: { [Op.eq]: companyId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      }
      ).then((result: CompanyAdress) => resolve(result)
      ).catch((error: any) => reject(error));
    });
  }

  update(companyAdress: CompanyAdress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAdress.sequelize.transaction();
      CompanyAdress.update(companyAdress.ToModify(),
        {
          where:
          {
            id: { [Op.eq]: companyAdress.id }
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
      const _transaction = await CompanyAdress.sequelize.transaction();
      CompanyAdress.destroy({
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

  save(companyAdress: CompanyAdress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAdress.sequelize.transaction();
      companyAdress.status = TransactionType.ACTIVE;
      CompanyAdress.create(companyAdress, { transaction: _transaction })
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