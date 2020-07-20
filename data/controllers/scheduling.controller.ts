import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ISchedulingController from '../interfaces/IControllers/ISchedulingController';
import ISchedulingRepository from '../interfaces/IRepositories/schedulingRepository.interface';
import IParkingSpaceRepository from "../interfaces/IRepositories/parking-spaceRepository.interface";
import IParkingPromotionRepository from "../interfaces/IRepositories/parking-promotionRepository.interface";
import IUserRepository from "../interfaces/IRepositories/userRepository.interface";
import IVehicleRepository from "../interfaces/IRepositories/vehicleRepository.interface";
import ICardRepository from "../interfaces/IRepositories/cardRepository.interface";
import Scheduling from "../models/scheduling.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Attributes from "../../commons/core/attributes";

/**
 * @description
 * @author Gustavo Gusmão
 * @class SchedulingController
 * @implements {ISchedulingController}
 */
@controller('')
class SchedulingController implements ISchedulingController {

  /**
   * Creates an instance of SchedulingController.
   * @author Marlon Lira
   * @param {ISchedulingRepository} _schedulingRepository
   * @param {IParkingSpaceRepository} _parkingSpaceRepository
   * @param {IParkingPromotionRepository} _parkingPromotionRepository
   * @param {IUserRepository} _userRepository
   * @param {IVehicleRepository} _vehicleRepository
   * @param {ICardRepository} _cardRepository
   * @memberof SchedulingController
   */
  constructor(
    @inject(TYPES.ISchedulingRepository) private _schedulingRepository: ISchedulingRepository,
    @inject(TYPES.IParkingSpaceRepository) private _parkingSpaceRepository: IParkingSpaceRepository,
    @inject(TYPES.IParkingPromotionRepository) private _parkingPromotionRepository: IParkingPromotionRepository,
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.IVehicleRepository) private _vehicleRepository: IVehicleRepository,
    @inject(TYPES.ICardRepository) private _cardRepository: ICardRepository) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof SchedulingController
   */
  @httpPost('/scheduling')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise(async (resolve) => {
      const _scheduling = new Scheduling(req.body.scheduling);
      try {
        if (
          Attributes.IsValid(_scheduling.cardId) &&
          Attributes.IsValid(_scheduling.userId) &&
          Attributes.IsValid(_scheduling.parkingId) &&
          Attributes.IsValid(_scheduling.vehicleId)
        ) {
          const _availableParkingSpace = await this._parkingSpaceRepository.GetAvailable(_scheduling);
          if (Attributes.IsValid(_availableParkingSpace)) {
            _scheduling.parkingSpaceId = _availableParkingSpace[0].id;
            _scheduling.userName = (await this._userRepository.GetById(_scheduling.userId)).name;
            _scheduling.vehiclePlate = (await this._vehicleRepository.GetById(_scheduling.vehicleId)).licensePlate;
            _scheduling.cardNumber = (await this._cardRepository.GetById(_scheduling.cardId)).number;

            const _userSchedulings: Scheduling[] = await this._schedulingRepository.GetByUserId(_scheduling.userId);
            if (Attributes.IsValid(_userSchedulings)) {

              const _userScheduling = await this._schedulingRepository.ReturnIfExists(_scheduling);
              if (Attributes.IsValid(_userScheduling)) {
                resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Agendamento'));
              } else {
                this._schedulingRepository.Save(_scheduling)
                  .then(result => {
                    global.SocketServer.emit('get.schedulings', result);
                    resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Agendamento', result));
                  });
              }
            } else {
              this._schedulingRepository.Save(_scheduling)
                .then(result => {
                  global.SocketServer.emit('get.schedulings', result);
                  resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Agendamento', result))
                });
            }
          } else {
            this._schedulingRepository.Save(_scheduling)
              .then(result => {
                global.SocketServer.emit('get.schedulings', result);
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Agendamento', result))
              });
          }
        } else {
          resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Agendamento'));
        }
      } catch (error) {
        resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
      }
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof SchedulingController
   */
  @httpGet('/schedulings/userId/:userId')
  @httpGet('/scheduling/id/:id')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    const _scheduling = new Scheduling(req.params);
    return new Promise((resolve) => {
      if (Attributes.IsValid(_scheduling.userId)) {
        this._schedulingRepository.GetByUserId(_scheduling.userId)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Agendamento', result));
          });
      } else if (Attributes.IsValid(_scheduling.id)) {
        this._schedulingRepository.GetById(_scheduling.id)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Agendamento', result));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Agendamento'));
      }
    });
  }

  @httpGet('/schedulings/companyId/:companyId')
  @httpGet('/schedulings/parkingId/:parkingId')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise(async (resolve) => {
      try {
        const _parkingId: number = req.params.parkingId;
        const _companyId: number = req.params.companyId;
        let _result: any;
        if (Attributes.IsValid(_parkingId)) {
          _result = await this._schedulingRepository.GetByParkingId(_parkingId);

        } else if (Attributes.IsValid(_companyId)) {
          _result = await this._schedulingRepository.GetByCompanyId(_companyId);
        }
        resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Agendamento', _result));
      } catch (error) {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Agendamento', error));
      }
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof SchedulingController
   */
  @httpPut('/scheduling')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _scheduling = new Scheduling(req.body.scheduling);
      this._schedulingRepository.Update(_scheduling)
        .then(result => {
          global.SocketServer.emit('get.schedulings');
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Agendamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof SchedulingController
   */
  @httpDelete('/scheduling/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _schedulingId: number = req.params.id;
      this._schedulingRepository.Delete(_schedulingId)
        .then(result => {
          global.SocketServer.emit('get.schedulings');
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Agendamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
        });
    });
  }
}

export default SchedulingController;