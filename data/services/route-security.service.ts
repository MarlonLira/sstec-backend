import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IRouteSecurityService } from "../interfaces/IServices/route-securityService.interface";
import { RouteSecurity } from "../models/route-security.model";
import { IRouteSecurityRepository } from "../interfaces/IRepositories/route-securityRepository.interface";
import { IRuleService } from "../interfaces/IServices/ruleService.interface";

@injectable()
export class RouteSecurityService implements IRouteSecurityService {

  constructor(
    @inject(TYPES.IRouteSecurityRepository) private repository: IRouteSecurityRepository,
    @inject(TYPES.IRuleService) private ruleService: IRuleService,
    @inject(TYPES.ILogService) private log: ILogService) { }

  save(routeSecurity: RouteSecurity): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(routeSecurity)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Route Security', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(routeSecurity: RouteSecurity): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(routeSecurity)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Route Security', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Route Security', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<RouteSecurity> {
    throw new Error("Method not implemented.");
  }

  getByName(name: string): Promise<RouteSecurity[]> {
    throw new Error("Method not implemented.");
  }

  toList(): Promise<RouteSecurity[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then(async (result: RouteSecurity[]) => {
          const rules = await this.ruleService.toList();
          const routeSecurity = [];

          result.forEach((items: RouteSecurity) => {
            const _result: any = items.ToAny();
            _result.rule = rules.find(x => x.id === items.ruleId);
            routeSecurity.push(_result);
          })
          resolve(routeSecurity);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Route Security', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByCompanyId(id: number): Promise<RouteSecurity[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByCompanyId(id)
        .then(async (result: RouteSecurity[]) => {
          const rules = await this.ruleService.toList();
          const routeSecurity = [];

          result.forEach((items: RouteSecurity) => {
            const _result: any = items.ToAny();
            _result.rule = rules.find(x => x.id === items.ruleId);
            routeSecurity.push(_result);
          })
          resolve(routeSecurity);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Route Security', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

}
