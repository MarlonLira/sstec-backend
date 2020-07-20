import { Rule } from '../../models/rule.model';

/**
 * @description
 * @author Marlon Lira
 * @interface IRuleRepository
 */
export interface IRuleRepository {

  /**
   * @description
   * @author Marlon Lira
   * @returns {Promise<Rule[]>}
   * @memberof IRuleRepository
   */
  toList(): Promise<Rule[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Rule} rule
   * @returns {Promise<any>}
   * @memberof IRuleRepository
   */
  save(rule: Rule): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Rule} rule
   * @returns {Promise<any>}
   * @memberof IRuleRepository
   */
  update(rule: Rule): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _id
   * @returns {Promise<any>}
   * @memberof IRuleRepository
   */
  delete(_id: number): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} _name
   * @returns {Promise<Rule[]>}
   * @memberof IRuleRepository
   */
  getByName(_name: string): Promise<Rule[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} _id
   * @returns {Promise<Rule>}
   * @memberof IRuleRepository
   */
  getById(_id: number): Promise<Rule>;
}