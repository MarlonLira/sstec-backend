import { Model, DataTypes, Op } from 'sequelize';
import * as db from '../db';
import IEntitie from './IEntitie';
import { DbInstance } from '../db'

var _instance = new DbInstance().getInstance();

class ClientMdl {
	public id!: number;
	public firstName!: string;
	public lastName!: string;
	public registryCode!: string;
	public phone!: string;

	constructor(firstName, lastName, registryCode, phone) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.registryCode = registryCode;
		this.phone = phone;
	}
}

class Client extends Model implements IEntitie {

	public id!: number;
	public firstName!: string;
	public lastName!: string;
	public registryCode!: string;
	public phone!: string;

	constructor(json?: any) {
		super()
		if (json != undefined) {
			this.id = json.id
			this.firstName = json.firstName
			this.lastName = json.lastName
			this.registryCode = json.registryCode
			this.phone = json.phone
		}
	}

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
					let found = result == null ? null : result.dataValues;
					resolve(found)
				})
				.catch(except => {
					reject(except)
				});
		})
	}

	Update(entitie: ClientMdl) {
		return new Promise((resolve, reject) => {
			this.Search(entitie).then(found => {
				if (found == null) { return resolve("Cliente não encontrado!") }
				entitie.id = found["id"];
				_instance.sync()
					.then(() => Client.update(entitie,
						{
							where: {
								id: entitie.id
							}
						}))
					.then(() => {
						let result = "Cliente Atualizado!";
						resolve(result)
					})
					.catch(j => {
						reject(j)
					});
			})
		})
	}

	Delete(value: ClientMdl) {
		return new Promise((resolve, reject) => {
			this.Search(value).then(x => {
				if (x == null) { return resolve("Cliente não encontrado!") }
				_instance.sync()
					.then(() => Client.destroy(
						{
							where: {
								id: value.id
							}
						}
					))
					.then(() => {
						let result = "Cliente Apagado!";
						resolve(result)
					})
					.catch(j => {
						reject(j)
					});
			})
		})
	}
}

Client.init({
	id: {
		type: new DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	firstName: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
	lastName: {
		type: new DataTypes.STRING(128),
		allowNull: false,
	},
	registryCode: {
		type: new DataTypes.STRING(12)
	},
	phone: {
		type: new DataTypes.STRING(12),
		allowNull: false,
	}
}, {
	sequelize: new db.DbInstance().getInstance(),
	tableName: 'Client',
	scopes: {
		public: {
			attributes: ['id', 'firstName', 'lastName', 'phone', 'registryCode']
		}
	}
});

Client.sync({force: false});

export { Client, ClientMdl };