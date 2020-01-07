import IEntitie from '../interfaces/IEntitie';
import { DbInstance } from '../context/DbContext'
import { Client } from '../models/Client';
import { Op } from 'sequelize';
import {HttpCod, HttpMessage } from '../commons/enums/HttpStatus';
import {Attributes} from '../commons/Helpers'

var _instance = new DbInstance().getInstance();
var _Attributes = new Attributes();

export default class ClientController extends Client implements IEntitie{

	Save(response? : any) {
		return new Promise((resolve, reject) => {
			Client.findOne({
				where: {
					firstName: this.firstName,
					lastName: this.lastName
				}
			}).then(result => {
				if (result != undefined && result != null) {
					resolve(response.status(HttpCod.Bad_Request).send(HttpMessage(HttpCod.Bad_Request, 'Usuário já cadastrado')));
				} else {
					Client.scope('public').create({
						firstName: this.firstName,
						lastName: this.lastName,
						registryCode: this.registryCode,
						phone: this.phone
					}).then(result => {
						response.status(HttpCod.Ok).send(HttpMessage(HttpCod.Ok, 'Cliente cadastrado com sucesso!', result));
						resolve(result);
					}).catch(error => {
						console.error(error)
						resolve(response.status(HttpCod.Internal_Server_Error).send(HttpMessage(HttpCod.Internal_Server_Error)));
					})
				}
			})
		})
	}

	Search(response? : any) {
		return new Promise((resolve, reject) => {
			let query: any = {}

			if (_Attributes.IsValid(this.lastName)) {
				query.lastName = {
					[Op.like]: `${this.lastName}%`
				}
			}

			if (_Attributes.IsValid(this.firstName)) {
				query.firstName = {
					[Op.like]: `${this.firstName}%`
				}
			}

			if (_Attributes.IsValid(this.registryCode)) {
				query.registryCode = {
					[Op.like]: `${this.registryCode}%`
				}
			}

			_instance.sync()
				.then(() => Client.scope("public").findOne({
					where: query
				}))
				.then(result => {
					response.status(HttpCod.Ok).send(HttpMessage(HttpCod.Ok, 'Usuario encontrato!', result));
					resolve(result);
				}).catch(error => {
					console.error(error)
					resolve(response.status(HttpCod.Internal_Server_Error).send(HttpMessage(HttpCod.Internal_Server_Error)));
				});
		})
	}

	Update(response? : any) {
		return new Promise((resolve, reject) => {
			let attributes: any = {}

			Client.findOne({
				where: {
					id: this.id
				}
			}).then(result => {
				attributes.firstName = _Attributes.ReturnIfValid(this.firstName) ?? result.firstName;
				attributes.lastName = _Attributes.ReturnIfValid(this.lastName) ?? result.lastName;
				attributes.registryCode = _Attributes.ReturnIfValid(this.registryCode)?? result.registryCode;
				attributes.phone = _Attributes.ReturnIfValid(this.phone) ?? result.phone;

				Client.update(attributes,{
					where:{
						id : this.id
					}
				})
				.then(result => {
					response.status(HttpCod.Ok).send(HttpMessage(HttpCod.Ok, 'Usuario Atualizado', result));
					resolve(result);
				})
				.catch(error => {
					resolve(response.status(HttpCod.Internal_Server_Error).send(HttpMessage(HttpCod.Internal_Server_Error, null, error)));
				})
			})
			.catch(error => {
				resolve(response.status(HttpCod.Not_Found).send(HttpMessage(HttpCod.Not_Found, 'Usuario não encontrado', error)));
			})
		})
	}

	Delete(response? : any) {
		return new Promise((resolve, reject) => {
			Client.destroy({
				where :{
					id : this.id
				}
			}).then(result => {
				if(result == 1){			
					response.status(HttpCod.Ok).send(HttpMessage(HttpCod.Ok, 'Usuario Apagado', result));
				}else{
					resolve(response.status(HttpCod.Not_Found).send(HttpMessage(HttpCod.Not_Found, 'Usuario não encontrado', result)));
				}
				resolve(result);
			})
			.catch(error => {
				resolve(response.status(HttpCod.Internal_Server_Error).send(HttpMessage(HttpCod.Not_Found, null, error)));
			})
		})
	}
}