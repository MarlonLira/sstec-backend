import Rule from '../../models/rule';

/**
 * @description
 * @author Marlon Lira
 * @interface IRuleRepository
 */
interface IRuleRepository {

  /**
   * @description
   * @author Marlon Lira
   * @returns {Promise<Rule[]>}
   * @memberof IRuleRepository
   */
  ToList(): Promise<Rule[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Rule} rule
   * @returns {Promise<any>}
   * @memberof IRuleRepository
   */
  Save(rule: Rule): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Rule} rule
   * @returns {Promise<any>}
   * @memberof IRuleRepository
   */
  Update(rule: Rule): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _id
   * @returns {Promise<any>}
   * @memberof IRuleRepository
   */
  Delete(_id: number): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} _name
   * @returns {Promise<Rule[]>}
   * @memberof IRuleRepository
   */
  GetByName(_name: string): Promise<Rule[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} _id
   * @returns {Promise<Rule>}
   * @memberof IRuleRepository
   */
  GetById(_id: number): Promise<Rule>;
}

export default IRuleRepository;