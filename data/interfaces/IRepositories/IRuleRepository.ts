import Rule from '../../models/rule';

/**
 * @description
 * @author Marlon Lira
 * @interface IRuleRepository
 */
interface IRuleRepository {
  ToList();
  Save(rule : Rule);
  Find(rule: Rule, properties: string[]);
}

export default IRuleRepository;