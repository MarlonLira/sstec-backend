import { injectable, inject } from "inversify";
import TYPES from "../types";
import { IRuleRepository } from "../interfaces/IRepositories/ruleRepository.interface";
import { IRuleService } from "../interfaces/IServices/ruleService.interface";
import { Rule } from "../models/rule.model";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";

@injectable()
export class RuleService implements IRuleService {

  constructor(
    @inject(TYPES.IRuleRepository) private repository: IRuleRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  save(rule: Rule): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(rule)
        .then((result: any) => resolve(result))
        .catch(async (error: any) => reject(await this.log.error('Rule', HttpCode.Internal_Server_Error, JSON.stringify(error))));
    });
  }

  update(rule: Rule): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(rule)
        .then((result: any) => resolve(result))
        .catch(async (error: any) => reject(await this.log.error('Rule', HttpCode.Internal_Server_Error, JSON.stringify(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) => reject(await this.log.error('Rule', HttpCode.Internal_Server_Error, JSON.stringify(error))));
    });
  }

  getById(id: number): Promise<Rule> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: Rule) => resolve(result))
        .catch(async (error: any) => reject(await this.log.error('Rule', HttpCode.Internal_Server_Error, JSON.stringify(error))));
    });
  }

  getByName(name: string): Promise<Rule[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByName(name)
        .then((result: Rule[]) => resolve(result))
        .catch(async (error: any) => reject(await this.log.error('Rule', HttpCode.Internal_Server_Error, JSON.stringify(error))));
    });
  }

  toList(): Promise<Rule[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then((result: any) => resolve(result))
        .catch(async (error: any) => reject(await this.log.error('Rule', HttpCode.Internal_Server_Error, JSON.stringify(error))));
    });
  }

}
