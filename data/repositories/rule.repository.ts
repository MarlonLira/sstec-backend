import { Op } from 'sequelize';

import { IRuleRepository } from '../interfaces/IRepositories/ruleRepository.interface';
import { Rule, RuleDAO } from '../models/rule.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class RuleRepository implements IRuleRepository {

  save(rule: Rule): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await RuleDAO.sequelize.transaction();
      rule.status = TransactionType.ACTIVE;
      RuleDAO.create(rule, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result.id);
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  getById(_id: number): Promise<Rule> {
    return new Promise((resolve, reject) => {
      RuleDAO.findByPk(_id)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  update(rule: Rule): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await RuleDAO.sequelize.transaction();
      RuleDAO.update(rule,
        {
          where:
            { id: { [Op.eq]: rule.id } },
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

  toList(): Promise<Rule[]> {
    return new Promise((resolve, reject) => {
      RuleDAO.findAll({
        where: {
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByName(_name: string): Promise<Rule[]> {
    return new Promise((resolve, reject) => {
      RuleDAO.findAll({
        where: {
          name: { [Op.like]: `${_name}%` },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await RuleDAO.sequelize.transaction();
      RuleDAO.update({ status: TransactionType.DELETED },
        {
          where: { id: { [Op.eq]: _id } },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback()
          reject(error);;
        });
    });
  }
}