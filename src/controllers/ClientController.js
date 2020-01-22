"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../models/Client");
const sequelize_1 = require("sequelize");
const Http_1 = require("../commons/enums/Http");
const Http_2 = require("../commons/functions/Http");
const Helpers_1 = require("../commons/Helpers");
class ClientController extends Client_1.Client {
    Save(response) {
        let query = {};
        if (Helpers_1.Attributes.IsValid(this.lastName)) {
            query.lastName = {
                [sequelize_1.Op.like]: `${this.lastName}%`
            };
        }
        if (Helpers_1.Attributes.IsValid(this.firstName)) {
            query.firstName = {
                [sequelize_1.Op.like]: `${this.firstName}%`
            };
        }
        if (Helpers_1.Attributes.IsValid(this.registryCode)) {
            query.registryCode = {
                [sequelize_1.Op.like]: `${this.registryCode}%`
            };
        }
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
                        response.status(Http_1.HttpCode.Ok).send(Http_2.GetHttpMessage(Http_1.HttpCode.Ok, Client_1.Client, result));
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
            let query = {};
            let valid = false;
            query.status = 1;
            if (!Helpers_1.Attributes.IsValid(this.id)) {
                if (Helpers_1.Attributes.IsValid(this.status)) {
                    query.status = this.status;
                    valid = true;
                }
                if (Helpers_1.Attributes.IsValid(this.lastName)) {
                    query.lastName = {
                        [sequelize_1.Op.like]: `${this.lastName}%`
                    };
                    valid = true;
                }
                if (Helpers_1.Attributes.IsValid(this.firstName)) {
                    query.firstName = {
                        [sequelize_1.Op.like]: `${this.firstName}%`
                    };
                    valid = true;
                }
                if (Helpers_1.Attributes.IsValid(this.registryCode)) {
                    query.registryCode = {
                        [sequelize_1.Op.like]: `${this.registryCode}%`
                    };
                    valid = true;
                }
            }
            else {
                query.id = this.id;
                valid = true;
            }
            if (valid || isAll) {
                Client_1.Client.scope("public").findAll({
                    where: query
                })
                    .then(result => {
                    if (!(Helpers_1.Attributes.IsValid(result) && Helpers_1.Attributes.IsValid(result[0]))) {
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
            }
            else {
                resolve(response.status(Http_1.HttpCode.Not_Found).send(Http_2.GetHttpMessage(Http_1.HttpCode.Not_Found, Client_1.Client, '')));
            }
        });
    }
    Update(response) {
        return new Promise((resolve, reject) => {
            let attributes = {};
            Client_1.Client.findOne({
                where: {
                    id: this.id
                }
            }).then(result => {
                var _a, _b, _c, _d;
                attributes.firstName = (_a = Helpers_1.Attributes.ReturnIfValid(this.firstName), (_a !== null && _a !== void 0 ? _a : result.firstName));
                attributes.lastName = (_b = Helpers_1.Attributes.ReturnIfValid(this.lastName), (_b !== null && _b !== void 0 ? _b : result.lastName));
                attributes.registryCode = (_c = Helpers_1.Attributes.ReturnIfValid(this.registryCode), (_c !== null && _c !== void 0 ? _c : result.registryCode));
                attributes.phone = (_d = Helpers_1.Attributes.ReturnIfValid(this.phone), (_d !== null && _d !== void 0 ? _d : result.phone));
                Client_1.Client.update(attributes, {
                    where: {
                        id: this.id
                    }
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
        return new Promise((resolve, reject) => {
            Client_1.Client.destroy({
                where: {
                    id: this.id
                }
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