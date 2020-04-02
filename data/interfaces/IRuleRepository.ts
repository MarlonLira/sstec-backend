import Rule from '../models/rule';

interface IRuleRepository {
  ToList();
  Save(rule : Rule);
  Find(rule: Rule, properties: string[]);
}