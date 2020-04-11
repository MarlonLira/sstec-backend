import { Op } from 'sequelize';

import IRuleRepository from '../interfaces/IRepositories/IRuleRepository';
import Rule from '../models/rule';
import Querying from '../../commons/core/querying';;
import { injectable } from "inversify";

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
   * @param {Rule} rule
   * @param {string[]} properties
   * @returns 
   * @memberof RuleRepository
   */
  Find(rule: Rule, properties: string[]) {
    return new Promise((resolve, reject) => {
      let query: any;
      query = Querying.ReturnOrQuery(rule, properties);
      Rule.findAll({
        where: query
      }).then(result => {
        resolve(result);
      }).catch(error => {
        reject(error);
      })
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Rule} rule
   * @memberof RuleRepository
   */
  Update(rule: Rule) {
    Rule.update(rule, {
      where: {
        id: 1
      }
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Rule} Rule
   * @returns 
   * @memberof RuleRepository
   */
  Save(rule: Rule) {
    return new Promise((resolve, reject) => {
      rule.status = 'AT';
      Rule.create(rule)
        .then((result: Rule) => {
          resolve(result.id);
        }).catch(error => {
          reject(error);
        })
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @returns 
   * @memberof RuleRepository
   */
  ToList() {
    return new Promise((resolve, reject) => {
      Rule.findAll()
        .then(result => {
          resolve(result);
        }
        )
        .catch(error => {
          throw error;
        })
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {string} RuleName
   * @returns {Promise}
   * @memberof RuleRepository
   */
  GetByName(ruleName: string) {
    return new Promise((resolve, reject) => {
      Rule.findAll({
        where: {
          name: {
            [Op.like]: `${ruleName}%`
          }
        }
      })
        .then(result => {
          resolve(result);
        }
        )
        .catch(error => {
          throw error;
        })
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} ruleId
   * @memberof RuleRepository
   */
  Delete(ruleId: number) {
    throw new Error("Method not implemented.");
  }
}

export default RuleRepository;