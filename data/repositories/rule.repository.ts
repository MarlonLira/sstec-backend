import { Op } from 'sequelize';

import { IRuleRepository } from '../interfaces/IRepositories/ruleRepository.interface';
import { Rule } from '../models/rule.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Marlon Lira
 * @class RuleRepository
 * @implements {IRuleRepository}
 */
@injectable()
export class RuleRepository implements IRuleRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {Rule} Rule
   * @returns
   * @memberof RuleRepository
   */
  save(rule: Rule): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Rule.sequelize.transaction();
      rule.status = TransactionType.ACTIVE;
      Rule.create(rule, { transaction: _transaction })
        .then(async (result: Rule) => {
          await _transaction.commit();
          resolve(result.id);
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {string} _id
   * @returns {Promise<Rule>}
   * @memberof RuleRepository
   */
  getById(_id: number): Promise<Rule> {
    return new Promise((resolve, reject) => {
      Rule.findByPk(_id)
        .then((foundRule: Rule) => {
          resolve(foundRule);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Rule} rule
   * @returns {Promise<any>}
   * @memberof RuleRepository
   */
  update(rule: Rule): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Rule.sequelize.transaction();
      Rule.update(rule.ToModify(),
        {
          where:
          {
            id: rule.id
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
   * @author Marlon Lira
   * @returns {Promise<Rule[]>}
   * @memberof RuleRepository
   */
  toList(): Promise<Rule[]> {
    return new Promise((resolve, reject) => {
      Rule.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {string} ruleName
   * @returns {Promise<Rule[]>}
   * @memberof RuleRepository
   */
  getByName(_name: string): Promise<Rule[]> {
    return new Promise((resolve, reject) => {
      Rule.findAll({
        where: {
          name: {
            [Op.like]: `${_name}%`
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} ruleId
   * @returns {Promise<any>}
   * @memberof RuleRepository
   */
  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Rule.sequelize.transaction();
      Rule.update({
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
          await _transaction.rollback()
          reject(error);;
        });
    });
  }
}