import IEntitie from '../interfaces/IEntitie';
import { DbInstance } from '../context/DbContext'
import { Client } from '../models/Client';
import { Op } from 'sequelize';

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
					resolve(response.status(400).send({
						code: 400,
						message: 'Usuário já cadastrado'
					}))
				} else {
					Client.scope('public').create({
						firstName: this.firstName,
						lastName: this.lastName,
						registryCode: this.registryCode,
						phone: this.phone
					}).then(result => {
						response.status(200).send(result);
						resolve(result);
					}).catch(error => {
						console.error(error)
						resolve(response.status(500).send({
							code: 500,
							message: 'internal error'
						}))
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
					response.status(200).send(result);
					resolve(result);
				}).catch(error => {
					console.error(error)
					resolve(response.status(500).send({
						code: 500,
						message: 'internal error'
					}))
				});
		})
	}

	Update(response? : any) {
		return new Promise((resolve, reject) => {
			resolve(null);
			response.status(501).send("Not Implemented");
      console.log("Não implementado");
		})
	}

	Delete(response? : any) {
		return new Promise((resolve, reject) => {
			resolve(null);
			response.status(501).send("Not Implemented");
      console.log("Não implementado");
		})
	}
}