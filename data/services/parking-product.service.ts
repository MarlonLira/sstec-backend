import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { IParkingProductService } from "../interfaces/IServices/parking-productService.interface";
import { IParkingProductRepository } from "../interfaces/IRepositories/parking-productRepository.interface";
import { ParkingProduct } from "../models/parking-product.model";

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @class ParkingProductService
 * @implements {IParkingProductService}
 */
@injectable()
export class ParkingProductService implements IParkingProductService {

  constructor(
    @inject(TYPES.IParkingProductRepository) private repository: IParkingProductRepository,
    @inject(TYPES.ILogService) private log: ILogService
    ) { }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingProduct} parkingProduct
   * @returns {Promise<any>}
   * @memberof ParkingProductService
   */
  save(parkingProduct: ParkingProduct): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parkingProduct)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Produto/Serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof ParkingProductService
   */
  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Produto/Serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))))
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<ParkingProduct>}
   * @memberof ParkingProductService
   */
  getById(id: number): Promise<ParkingProduct> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: ParkingProduct) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Produto/Serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<ParkingProduct[]>}
   * @memberof ParkingProductService
   */
  getByParkinkId(id: number): Promise<ParkingProduct[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then((result: ParkingProduct[]) => resolve(result))
        .catch(error => {
          reject(this.log.critical('Produto/Serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingProduct} parkingProduct
   * @returns {Promise<any>}
   * @memberof ParkingProductService
   */
  update(parkingProduct: ParkingProduct): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(new ParkingProduct(parkingProduct))
        .then(result => resolve(result))
        .catch(error =>
          reject(this.log.critical('Produto/Serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} parkingId
   * @returns {Promise<ParkingProduct[]>}
   * @memberof ParkingProductService
   */
  toList(parkingId: number): Promise<ParkingProduct[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(parkingId)
        .then((result: ParkingProduct[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Produto/Serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
