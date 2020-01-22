import IEntitie from '../interfaces/IEntitie';
import { Client } from '../models/Client';
import { Op } from 'sequelize';
import { HttpCode } from '../commons/enums/Http';
import { GetHttpMessage } from '../commons/functions/Http';
import { Attributes } from '../commons/Helpers'

export default class ClientController extends Client implements IEntitie {

	Save(response?: any) {
		let query: any = {};
		if (Attributes.IsValid(this.lastName)) {
			query.lastName = {
				[Op.like]: `${this.lastName}%`
			};
		}

		if (Attributes.IsValid(this.firstName)) {
			query.firstName = {
				[Op.like]: `${this.firstName}%`
			};
		}

		if (Attributes.IsValid(this.registryCode)) {
			query.registryCode = {
				[Op.like]: `${this.registryCode}%`
			};
		}

		return new Promise((resolve, reject) => {
			Client.findOne({
				where: query
			}).then(result => {
				if (result != undefined && result != null) {
					resolve(response.status(HttpCode.Bad_Request).send(GetHttpMessage(HttpCode.Bad_Request, Client, result)));
				} else {
					Client.create({
						firstName: Attributes.ReturnIfValid(this.firstName),
						lastName: Attributes.ReturnIfValid(this.lastName),
						status: 1,
						registryCode: Attributes.ReturnIfValid(this.registryCode),
						phone: this.phone
					}).then(result => {
						response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, Client, result));
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
			let query: any = {};
			let valid: boolean = false;
			query.status = 1;

			if (!Attributes.IsValid(this.id)) {

				if (Attributes.IsValid(this.status)) {
					query.status = this.status;
					valid = true;
				}

				if (Attributes.IsValid(this.lastName)) {
					query.lastName = {
						[Op.like]: `${this.lastName}%`
					};
					valid = true;
				}

				if (Attributes.IsValid(this.firstName)) {
					query.firstName = {
						[Op.like]: `${this.firstName}%`
					};
					valid = true;
				}

				if (Attributes.IsValid(this.registryCode)) {
					query.registryCode = {
						[Op.like]: `${this.registryCode}%`
					};
					valid = true;
				}
			} else {
				query.id = this.id;
				valid = true;
			}
			if (valid || isAll) {
				Client.scope("public").findAll({
					where: query
				})
					.then(result => {
						if (!(Attributes.IsValid(result) && Attributes.IsValid(result[0]))) {
							response.status(HttpCode.Ok).send(GetHttpMessage(HttpCode.Ok, Client, result));
							resolve(result);
						}
						else {
							resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, Client, '')));
						}
						resolve(result);
					}).catch(error => {
						console.error(error)
						resolve(response.status(HttpCode.Internal_Server_Error).send(GetHttpMessage(HttpCode.Internal_Server_Error, Client, error)));
					});
			} else {
				resolve(response.status(HttpCode.Not_Found).send(GetHttpMessage(HttpCode.Not_Found, Client, '')));
			}
		})
	}

	Update(response?: any) {
		return new Promise((resolve, reject) => {
			let attributes: any = {}

			Client.findOne({
				where: {
					id: this.id
				}
			}).then(result => {
				attributes.firstName = Attributes.ReturnIfValid(this.firstName) ?? result.firstName;
				attributes.lastName = Attributes.ReturnIfValid(this.lastName) ?? result.lastName;
				attributes.registryCode = Attributes.ReturnIfValid(this.registryCode) ?? result.registryCode;
				attributes.phone = Attributes.ReturnIfValid(this.phone) ?? result.phone;

				Client.update(attributes, {
					where: {
						id: this.id
					}
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
		return new Promise((resolve, reject) => {
			Client.destroy({
				where: {
					id: this.id
				}
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