import { Rule } from '../../models/rule.model';

export interface IRuleRepository {
  toList(): Promise<Rule[]>;
  save(rule: Rule): Promise<any>;
  update(rule: Rule): Promise<any>;
  delete(_id: number): Promise<any>;
  getByName(_name: string): Promise<Rule[]>;
  getById(_id: number): Promise<Rule>;
}