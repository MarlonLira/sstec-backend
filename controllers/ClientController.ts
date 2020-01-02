import IEntitie from '../interfaces/IEntitie';
import { DbInstance } from '../context/DbContext'
import { Client } from '../models/Client';
import { Op } from 'sequelize';
import {HttpCod, HttpMessage } from '../enums/HttpStatus';

var _instance = new DbInstance().getInstance();

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
					resolve(response.status(HttpCod.Bad_Request).send(HttpMessage(HttpCod.Bad_Request, 'Usuário já cadastrado')))
				} else {
					Client.scope('public').create({
						firstName: this.firstName,
						lastName: this.lastName,
						registryCode: this.registryCode,
						phone: this.phone
					}).then(result => {
						response.status(HttpCod.Ok).send(HttpMessage(HttpCod.Ok, 'Cliente encontrado!'));
						resolve(result);
					}).catch(error => {
						console.error(error)
						resolve(response.status(HttpCod.Internal_Server_Error).send(HttpMessage(HttpCod.Internal_Server_Error)))
					})
				}
			})
		})
	}

	Search(response? : any) {
		return new Promise((resolve, reject) => {
			let query: any = {}

			if (this.lastName != undefined && this.lastName != '' && this.lastName != null) {
				query.lastName = {
					[Op.like]: `${this.lastName}%`
				}
			}

			if (this.firstName != undefined && this.firstName != '' && this.firstName != null) {
				query.firstName = {
					[Op.like]: `${this.firstName}%`
				}
			}

			if (this.registryCode != undefined && this.registryCode != '' && this.registryCode != null) {
				query.registryCode = {
					[Op.like]: `${this.registryCode}%`
				}
			}

			_instance.sync()
				.then(() => Client.scope("public").findOne({
					where: query
				}))
				.then(result => {
					response.status(HttpCod.Ok).send(HttpMessage(HttpCod.Ok));
					resolve(result);
				}).catch(error => {
					console.error(error)
					resolve(response.status(HttpCod.Internal_Server_Error).send(HttpMessage(HttpCod.Internal_Server_Error)))
				});
		})
	}

	Update(response? : any) {
		return new Promise((resolve, reject) => {
			resolve(response.status(HttpCod.Not_Implemented).send(HttpMessage(HttpCod.Not_Implemented)));
      console.log("Não implementado");
		})
	}

	Delete(response? : any) {
		return new Promise((resolve, reject) => {
			resolve(response.status(HttpCod.Not_Implemented).send(HttpMessage(HttpCod.Not_Implemented)));
      console.log("Não implementado");
		})
	}
}