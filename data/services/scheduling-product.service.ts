import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { ISchedulingProductService } from "../interfaces/IServices/scheduling-productService.interface";
import { SchedulingProduct } from "../models/scheduling-product.model";
import { ISchedulingProductRepository } from "../interfaces/IRepositories/scheduling-productRepository.interface";

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @class SchedulingProductService
 * @implements {ISchedulingProductService}
 */
@injectable()
export class SchedulingProductService implements ISchedulingProductService {

  constructor(
    @inject(TYPES.ISchedulingProductRepository) private repository: ISchedulingProductRepository,
    @inject(TYPES.ILogService) private log: ILogService
    ) { }

  save(schedulingProduct: SchedulingProduct): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(schedulingProduct)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(schedulingProduct: SchedulingProduct): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(schedulingProduct)
        .then(result => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<SchedulingProduct> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: SchedulingProduct) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getBySchedulingId(schedulingId: number): Promise<SchedulingProduct[]> {
    return new Promise((resolve, reject) => {
      this.repository.getBySchedulingId(schedulingId)
        .then(async (result: SchedulingProduct[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByParkingProductId(parkingProductId: number): Promise<SchedulingProduct[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingProductId(parkingProductId)
        .then(async (result: SchedulingProduct[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
