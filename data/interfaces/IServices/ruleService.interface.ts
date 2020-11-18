import { Rule } from "../../models/rule.model";

export interface IRuleService {
  save(rule: Rule): Promise<any>;
  update(rule: Rule): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<Rule>;
  getByName(name: string): Promise<Rule[]>;
  toList(): Promise<Rule[]>;
}