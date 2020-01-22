"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../models/Client");
const Http_1 = require("../commons/enums/Http");
const Http_2 = require("../commons/functions/Http");
const Helpers_1 = require("../commons/Helpers");
class ClientController extends Client_1.Client {
    Save(response) {
        let query = Helpers_1.Querying.ReturnLikeQuery(this, ['firstName', 'lastName', 'registryCode']);
        return new Promise((resolve, reject) => {
            Client_1.Client.findOne({
                where: query
            }).then(result => {
                if (result != undefined && result != null) {
                    resolve(response.status(Http_1.HttpCode.Bad_Request).send(Http_2.GetHttpMessage(Http_1.HttpCode.Bad_Request, Client_1.Client, result)));
                }
                else {
                    Client_1.Client.create({
                        firstName: Helpers_1.Attributes.ReturnIfValid(this.firstName),
                        lastName: Helpers_1.Attributes.ReturnIfValid(this.lastName),
                        status: 1,
                        registryCode: Helpers_1.Attributes.ReturnIfValid(this.registryCode),
                        phone: this.phone
                    }).then(result => {
                        response.status(Http_1.HttpCode.Ok).send(Http_2.GetHttpMessage(Http_1.HttpCode.Created, Client_1.Client, result));
                        resolve(result);
                    }).catch(error => {
                        console.error(error);
                        resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Internal_Server_Error, Client_1.Client, error)));
                    });
                }
            });
        });
    }
    Search(response, isAll) {
        return new Promise((resolve, reject) => {
            let query;
            if (!isAll) {
                query = Helpers_1.Querying.ReturnEqualQuery(this, ['id']);
                if (!Helpers_1.Attributes.IsValid(query)) {
                    query = Helpers_1.Querying.ReturnLikeQuery(this, ['status', 'lastName', 'registryCode', 'firstName']);
                }
            }
            Client_1.Client.scope("public").findAll({
                where: query
            })
                .then(result => {
                if (Helpers_1.Attributes.IsValid(result) && Helpers_1.Attributes.IsValid(result[0])) {
                    response.status(Http_1.HttpCode.Ok).send(Http_2.GetHttpMessage(Http_1.HttpCode.Ok, Client_1.Client, result));
                    resolve(result);
                }
                else {
                    resolve(response.status(Http_1.HttpCode.Not_Found).send(Http_2.GetHttpMessage(Http_1.HttpCode.Not_Found, Client_1.Client, '')));
                }
                resolve(result);
            }).catch(error => {
                console.error(error);
                resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Internal_Server_Error, Client_1.Client, error)));
            });
        });
    }
    Update(response) {
        return new Promise((resolve, reject) => {
            let attributes = {};
            let query = Helpers_1.Querying.ReturnEqualQuery(this, ['id']);
            Client_1.Client.findOne({
                where: query
            })
                .then(result => {
                attributes.firstName = Helpers_1.Attributes.ReturnIfValid(this.firstName, result.firstName);
                attributes.lastName = Helpers_1.Attributes.ReturnIfValid(this.lastName, result.lastName);
                attributes.registryCode = Helpers_1.Attributes.ReturnIfValid(this.registryCode, result.registryCode);
                attributes.phone = Helpers_1.Attributes.ReturnIfValid(this.phone, result.phone);
                Client_1.Client.update(attributes, {
                    where: query
                })
                    .then(result => {
                    response.status(Http_1.HttpCode.Ok).send(Http_2.GetHttpMessage(Http_1.HttpCode.Ok, Client_1.Client, result));
                    resolve(result);
                })
                    .catch(error => {
                    resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Internal_Server_Error, Client_1.Client, error)));
                });
            })
                .catch(error => {
                resolve(response.status(Http_1.HttpCode.Not_Found).send(Http_2.GetHttpMessage(Http_1.HttpCode.Not_Found, Client_1.Client, error)));
            });
        });
    }
    Delete(response) {
        let query = Helpers_1.Querying.ReturnEqualQuery(this, ['id']);
        return new Promise((resolve, reject) => {
            Client_1.Client.destroy({
                where: query
            }).then(result => {
                if (result == 1) {
                    response.status(Http_1.HttpCode.Ok).send(Http_2.GetHttpMessage(Http_1.HttpCode.Ok, Client_1.Client, result));
                }
                else {
                    resolve(response.status(Http_1.HttpCode.Not_Found).send(Http_2.GetHttpMessage(Http_1.HttpCode.Not_Found, Client_1.Client, result)));
                }
                resolve(result);
            })
                .catch(error => {
                resolve(response.status(Http_1.HttpCode.Internal_Server_Error).send(Http_2.GetHttpMessage(Http_1.HttpCode.Not_Found, Client_1.Client, error)));
            });
        });
    }
}
exports.default = ClientController;
//# sourceMappingURL=ClientController.js.map