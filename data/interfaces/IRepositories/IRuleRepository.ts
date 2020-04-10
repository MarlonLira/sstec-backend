import Rule from '../../models/rule';

/**
 * @description
 * @author Marlon Lira
 * @interface IRuleRepository
 */
interface IRuleRepository {
  ToList();
  Save(rule: Rule);
  Update(rule: Rule);
  Delete(ruleId: number);
  GetByName(ruleName: string);
  Find(rule: Rule, properties: string[]);
}

export default IRuleRepository;