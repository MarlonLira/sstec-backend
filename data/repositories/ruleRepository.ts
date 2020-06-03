import { Op } from 'sequelize';

import IRuleRepository from '../interfaces/IRepositories/IRuleRepository';
import Rule from '../models/rule';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Marlon Lira
 * @class RuleRepository
 * @implements {IRuleRepository}
 */
@injectable()
class RuleRepository implements IRuleRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {Rule} Rule
   * @returns
   * @memberof RuleRepository
   */
  Save(rule: Rule): Promise<any> {
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
  GetById(_id: number): Promise<Rule> {
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
  Update(rule: Rule): Promise<any> {
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
  ToList(): Promise<Rule[]> {
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
  GetByName(_name: string): Promise<Rule[]> {
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
  Delete(_id: number): Promise<any> {
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

export default RuleRepository;