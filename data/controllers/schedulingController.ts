import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ISchedulingController from '../interfaces/IControllers/ISchedulingController';
import ISchedulingRepository from '../interfaces/IRepositories/ISchedulingRepository';
import Scheduling from "../models/scheduling";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Attributes from "../../commons/core/attributes";
import { InnerDate, ConvertToDateTime } from "../../commons/core/innerDate";
import IParkingSpaceRepository from "../interfaces/IRepositories/IParkingSpaceRepository";
import IParkingPromotionRepository from "../interfaces/IRepositories/IParkingPromotionRepository";

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
   * @author Gustavo Gusmão
   * @param {ISchedulingRepository} _schedulingRepository
   * @param {IUserRepository} _userRepository
   * @memberof SchedulingController
   */
  constructor(
    @inject(TYPES.ISchedulingRepository) private _schedulingRepository: ISchedulingRepository,
    @inject(TYPES.ISchedulingRepository) private _parkingSpaceRepository: IParkingSpaceRepository,
    @inject(TYPES.ISchedulingRepository) private _parkingPromotionRepository: IParkingPromotionRepository) { }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof SchedulingController
   */
  @httpPost('/scheduling')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _scheduling = new Scheduling(req.body.scheduling);
      this._schedulingRepository.GetByUserId(_scheduling.userId)
        .then((foundSchedulings: Scheduling[]) => {
          if (!Attributes.IsValid(foundSchedulings)) {
            this._schedulingRepository.Save(_scheduling)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Agendamento', result));
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
              });
          } else {
            const findSchedule = foundSchedulings.find(
              s => new InnerDate().ConvertToDateTime(s.avaliableTime).hours === new InnerDate().ConvertToDateTime(_scheduling.avaliableTime).hours &&
                new InnerDate().ConvertToDateTime(s.avaliableTime).shortDate === new InnerDate().ConvertToDateTime(_scheduling.avaliableTime).shortDate &&
                new InnerDate().ConvertToDateTime(s.unavailableTime).hours >= new InnerDate().ConvertToDateTime(_scheduling.avaliableTime).hours);
            if (!Attributes.IsValid(findSchedule)) {
              this._schedulingRepository.Save(_scheduling)
                .then(result => {
                  resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Agendamento', result));
                })
                .catch(error => {
                  resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
                });
            } else {
              resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Already_Exists, 'Agendamento', findSchedule));
            }
          }
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
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Agendamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
        });
    });
  }

}

export default SchedulingController;