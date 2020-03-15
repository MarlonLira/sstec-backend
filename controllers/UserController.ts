import IEntitie from '../interfaces/IEntitie';
import { User } from '../models/User';
import { HttpCode } from '../commons/enums/Http';
import { GetHttpMessage } from '../commons/functions/Http';
import { Attributes, Querying, Crypto } from '../commons/Helpers';

export default class UserController extends User implements IEntitie {
  Save(response?: any) {
    return new Promise((resolve, reject) => {
      let query: any;
      query = Querying.ReturnLikeQuery(this, ['registryCode',])
      query.status = 1;
      User.findOne({ where: query })
        .then(result => {
          if (!Attributes.IsValid(result)) {
            User.create({
              name: this.name,
              registryCode: this.registryCode,
              phone: this.phone,
              email: this.email,
              status: 1,
              password: Crypto.Encrypt(this.password)
            }).then(result => {
              resolve(response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, User, result)));
            }).catch(error => {
              resolve(response.status(HttpCode.Bad_Request).send(GetHttpMessage(HttpCode.Bad_Request, User, error)));
            })
          } else {
            resolve(response.status(HttpCode.Bad_Request).send(GetHttpMessage(HttpCode.Bad_Request, User, "Já existe um cadastro para o usuário!")));
          }
        })
        .catch(error => {
          reject(error.message);
        })
    })
  }
  Search(response?: any, isAll?: boolean) {
    return new Promise((resolve, reject) => {
      let query: any;
      if (!isAll) {
        if (this.id > 0) {
          query = Querying.ReturnEqualQuery(this, ['id']);
        }
        else {
          query = Querying.ReturnLikeQuery(this, ['registryCode', 'email']);
        }
      }

      User.findAll({
        where: query
      })
        .then(result => {
          if (Attributes.IsValid(result) && Attributes.IsValid(result[0])) {
            resolve(response.status(HttpCode.Ok).send(result));
          }
          else {
            resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, User, '')));
          }
          resolve(result);
        }).catch(error => {
          console.error(error)
          resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, User, error)));
        });
    })
  }
  Update(response?: any) {
    throw new Error("Method not implemented.");
  }
  Delete(response?: any) {
    throw new Error("Method not implemented.");
  }
}