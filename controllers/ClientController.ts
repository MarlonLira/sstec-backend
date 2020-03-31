import IEntitie from '../interfaces/IEntitie';
import { Client } from '../models/Client';
import { Op } from 'sequelize';
import { HttpCode } from '../commons/enums/Http';
import { GetHttpMessage } from '../commons/functions/Http';
import { Attributes, Querying } from '../commons/Helpers'

export default class ClientController extends Client implements IEntitie {

  Save(response?: any) {
    let query: any = Querying.ReturnLikeQuery(this, ['name', 'registryCode']);
    return new Promise((resolve, reject) => {
      Client.findOne({
        where: query
      }).then(result => {
        if (result != undefined && result != null) {
          resolve(response.status(HttpCode.Bad_Request).send(result));
        } else {
          Client.create({
            name: this.name,
            status: 1,
            registryCode: this.registryCode,
            phone: this.phone,
            email: this.email
          }).then(result => {
            response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Created, Client, result));
            resolve(result);
          }).catch(error => {
            console.error(error)
            resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, Client, error)));
          })
        }
      })
    })
  }

  Search(response?: any, isAll?: boolean) {
    return new Promise((resolve, reject) => {
      let query: any;
      if (!isAll) {
        query = Querying.ReturnEqualQuery(this, ['id']);
        if (!Attributes.IsValid(query)) {
          query = Querying.ReturnLikeQuery(this, ['status', 'name', 'registryCode']);
        }
      }

      Client.scope("public").findAll({
        where: query
      })
        .then(result => {
          if (Attributes.IsValid(result) && Attributes.IsValid(result[0])) {
            resolve(response.status(HttpCode.Ok).send(result));
          }
          else {
            resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, Client, '')));
          }
          resolve(result);
        }).catch(error => {
          console.error(error)
          resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, Client, error)));
        });
    })
  }

  Update(response?: any) {
    return new Promise((resolve, reject) => {
      let attributes: any = {}
      let query = Querying.ReturnEqualQuery(this, ['id']);

      Client.findOne({
        where: query
      })
        .then(result => {
          attributes.name = Attributes.ReturnIfValid(this.name, result.name);
          attributes.registryCode = Attributes.ReturnIfValid(this.registryCode, result.registryCode);
          attributes.phone = Attributes.ReturnIfValid(this.phone, result.phone);
          attributes.email = Attributes.ReturnIfValid(this.email, result.email);

          Client.update(attributes, {
            where: query
          })
            .then(result => {
              response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, Client, result));
              resolve(result);
            })
            .catch(error => {
              resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, Client, error)));
            })
        })
        .catch(error => {
          resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, Client, error)));
        })
    })
  }

  Delete(response?: any) {
    let query = Querying.ReturnEqualQuery(this, ['id']);
    return new Promise((resolve, reject) => {
      Client.destroy({
        where: query
      }).then(result => {
        if (result == 1) {
          response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, Client, result));
        } else {
          resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, Client, result)));
        }
        resolve(result);
      })
        .catch(error => {
          resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Not_Found, Client, error)));
        })
    })
  }
}