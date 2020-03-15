import IEntitie from '../interfaces/IEntitie';
import { Product } from '../models/Product';
import { HttpCode } from '../commons/enums/Http';
import { GetHttpMessage } from '../commons/functions/Http';
import { InnerDate } from '../models/InnerDate';
import { Attributes } from '../commons/Helpers';

export default class ProductController extends Product implements IEntitie {
  Save(response?: any) {
    return new Promise((resolve, reject) => {
      Product.create({
        name: this.name,
        status: 1,
        code: this.code,
        amount: this.amount,
        date: this.date,
        validity: this.validity,
        obs: this.obs
      }).then(result => {
        response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, Product, result));
        resolve(result);
      }).catch(error => {
        console.error(error.message);
        resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, Product, error)));
      })
    })
  }

  Search(response?: any, isAll?: boolean) {
    let _result: any = [];
    return new Promise((resolve, reject) => {
      Product.findAll()
        .then(result => {
          if (result != null && result != undefined) {
            result.forEach(found => {
              found.setDataValue('innerDate', new InnerDate(found.date));
              found.setDataValue('innerValidity', new InnerDate(found.validity));
              _result.push(found);
            })
            response.status(HttpCode.Ok).send(_result);
            resolve(_result);
          }
          else {
            resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, Product)));
          }
          resolve(result);
        }).catch(error => {
          console.error(error)
          resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, Product, error)));
        });
    })
  }
  Update(response?: any) {
    return new Promise((resolve, reject) => {
      let attributes: any = {}

      Product.findOne({
        where: {
          id: this.id
        }
      }).then(result => {
        attributes.name = Attributes.ReturnIfValid(this.name, result.name);
        attributes.amount = Attributes.ReturnIfValid(this.amount, result.amount);
        attributes.code = Attributes.ReturnIfValid(this.code, result.code);
        attributes.date = Attributes.ReturnIfValid(this.date, result.date);
        attributes.validity = Attributes.ReturnIfValid(this.validity, result.validity);
        attributes.obs = Attributes.ReturnIfValid(this.obs, result.obs);

        Product.update(attributes, {
          where: {
            id: this.id
          }
        })
          .then(result => {
            response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, Product, result));
            resolve(result);
          })
          .catch(error => {
            resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, Product, error)));
          })
      })
        .catch(error => {
          resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, Product, error)));
        })
    })
  }
  Delete(response?: any) {
    return new Promise((resolve, reject) => {
      Product.destroy({
        where: {
          id: this.id
        }
      }).then(result => {
        if (result == 1) {
          response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, Product, result));
        } else {
          resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, Product, result)));
        }
        resolve(result);
      })
        .catch(error => {
          resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, Product, error)));
        })
    })
  }
}