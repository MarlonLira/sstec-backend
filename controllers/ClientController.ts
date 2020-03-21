import IEntitie from '../interfaces/IEntitie';
import { Client } from '../models/Client';
import { Op } from 'sequelize';
import { HttpCode } from '../commons/enums/Http';
import { GetHttpMessage } from '../commons/functions/Http';
import { Attributes, Querying } from '../commons/Helpers'

export default class ClientController extends Client implements IEntitie {

	Save(response?: any) {
		let query: any = Querying.ReturnLikeQuery(this, ['registryCode']);
		return new Promise((resolve, reject) => {
			Client.findOne({
				where: query
			}).then(result => {
				if (result != undefined && result != null) {
					response.status(HttpCode.Bad_Request).send(GetHttpMessage(HttpCode.Bad_Request, Client, null, 'Cliente já cadastrado'));
					resolve(false);
				} else {
					Client.create({
						firstName: Attributes.ReturnIfValid(this.firstName),
						lastName: Attributes.ReturnIfValid(this.lastName),
						status: 1,
						registryCode: Attributes.ReturnIfValid(this.registryCode),
						phone: this.phone
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
					query = Querying.ReturnLikeQuery(this, ['status', 'lastName', 'registryCode', 'firstName']);
				}
			}
			Client.scope("public").findAll({
				where: query
			})
				.then(result => {
					if (Attributes.IsValid(result) && Attributes.IsValid(result[0])) {
						response.status(HttpCode.Found).send(GetHttpMessage(HttpCode.Found, Client, result));
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
					attributes.firstName = Attributes.ReturnIfValid(this.firstName, result.firstName);
					attributes.lastName = Attributes.ReturnIfValid(this.lastName, result.lastName);
					attributes.registryCode = Attributes.ReturnIfValid(this.registryCode, result.registryCode);
					attributes.phone = Attributes.ReturnIfValid(this.phone, result.phone);

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