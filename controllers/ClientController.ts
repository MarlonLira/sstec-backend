import IEntitie from '../interfaces/IEntitie';
import { DbInstance } from '../context/DbContext'
import { Client } from '../models/Client';
import { Op } from 'sequelize';
import {HttpCod, HttpMessage } from '../commons/enums/HttpStatus';
import {Attributes} from '../commons/Helpers'
import { response } from 'express';
import { promises } from 'dns';

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
					Client.create({
						firstName: _Attributes.ReturnIfValid(this.firstName),
						lastName: _Attributes.ReturnIfValid(this.lastName),
						status: 1,
						registryCode: _Attributes.ReturnIfValid(this.registryCode),
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
			let query: any = {};
			let valid: boolean = false;
			
			if(!_Attributes.IsValid(this.id)){
				
				query.status = 1;
				if(_Attributes.IsValid(this.status)){
					query.status = this.status;
					valid = true;
				}

				if (_Attributes.IsValid(this.lastName)) {
					query.lastName = {
						[Op.like]: `${this.lastName}%`
					};
					valid = true;
				}

				if (_Attributes.IsValid(this.firstName)) {
					query.firstName = {
						[Op.like]: `${this.firstName}%`
					};
					valid = true;
				}

				if (_Attributes.IsValid(this.registryCode)) {
					query.registryCode = {
						[Op.like]: `${this.registryCode}%`
					};
					valid = true;
				}
			}else{
				query.id = this.id;
			}
			if(valid){
				Client.scope("public").findOne({
					where: query
				})
				.then(result => {
					if(result != null)
						response.status(HttpCod.Ok).send(HttpMessage(HttpCod.Ok, 'Usuario encontrato!', result));
					else
						resolve(response.status(HttpCod.Not_Found).send(HttpMessage(HttpCod.Not_Found)));

					resolve(result);
				}).catch(error => {
					console.error(error)
					resolve(response.status(HttpCod.Internal_Server_Error).send(HttpMessage(HttpCod.Internal_Server_Error)));
				});
			}else{
				resolve(response.status(HttpCod.Not_Found).send(HttpMessage(HttpCod.Not_Found)));
			}
		})
	}

	SearchAll(response? : any){
		let query: any = {}
		query.status = _Attributes.ReturnIfValid(this.status) ?? 1;
		return new Promise((resolve, reject) => {
			Client.scope("public").findAll(query)
			.then(result => {
				response.status(HttpCod.Ok).send(HttpMessage(HttpCod.Ok, null, result));
				resolve(result);
			})
			.catch(error => {
				console.error(error);
				resolve(response.status(HttpCod.Internal_Server_Error).send(HttpMessage(HttpCod.Internal_Server_Error)));
			})
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