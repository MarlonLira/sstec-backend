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
          resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, User, error)));
        });
    })
  }
  Update(response?: any) {
    return new Promise((resolve, reject) => {
      let attributes: any = {}
      let query = Querying.ReturnEqualQuery(this, ['id']);

      User.findOne({
        where: query
      })
        .then(result => {
          attributes.name = Attributes.ReturnIfValid(this.name, result.name);
          attributes.registryCode = Attributes.ReturnIfValid(this.registryCode, result.registryCode);
          attributes.phone = Attributes.ReturnIfValid(this.phone, result.phone);
          attributes.email = Attributes.ReturnIfValid(this.email, result.email);
          
          if (Attributes.IsValid(result) && Crypto.Compare(this.password, result.password)) {
            attributes.newPassword = Attributes.ReturnIfValid(this.newPassword);
            if (attributes.newPassword != null){
              attributes.newPassword = Crypto.Encrypt(attributes.newPassword);
            }
            attributes.password = Attributes.ReturnIfValid(attributes.newPassword, result.password);
            User.update(attributes, {
              where: query
            })
              .then(result => {
                response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, User, result, "Atualizado"));
                resolve(result);
              })
              .catch(error => {
                resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, User, error)));
              })
          } else {
            resolve(false)
            response.status(HttpCode.Unauthorized).send(GetHttpMessage(HttpCode.Unauthorized, User, 'Unauthorized', 'A conta informada é inválida!'));
          }
        })
    })
  }
  Delete(response?: any) {
    let query = Querying.ReturnEqualQuery(this, ['id']);
    return new Promise((resolve, reject) => {
      User.destroy({
        where: query
      }).then(result => {
        if (result == 1) {
          response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, User, result, 'Usuário deletado'));
        } else {
          resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, User, result)));
        }
        resolve(result);
      })
        .catch(error => {
          resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Not_Found, User, error)));
        })
    })
  }
}