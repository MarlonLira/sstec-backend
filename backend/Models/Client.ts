import { Model, DataTypes } from 'sequelize';
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
}

class Client extends Model implements IEntitie {

	public id!: number;
	public firstName!: string;
	public lastName!: string;
	public registryCode!: string;
	public phone!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	Save(entitie: ClientMdl) {
		return new Promise((resolve, reject) => {
			if (entitie.firstName == null || entitie.lastName == null) { return resolve("Erro: existe campos vazios, preencha os campos necessarios!") }
			this.Search(entitie).then(found => {
				if (found != null) { return resolve("Erro: Já existe um cliente com essas informações! ") }
				_instance.sync()
					.then(() => Client.create({
						firstName: entitie.firstName,
						lastName: entitie.lastName,
						registryCode: entitie.registryCode,
						phone: entitie.phone
					}))
					.then(result => {
						resolve(result.dataValues)
					})
			})
		})
	}
	Search(entitie: ClientMdl) {
		return new Promise((resolve, reject) => {
			if (entitie.id > 0)
				this.SearchById(entitie).then(result => resolve(result));
			else if (entitie.registryCode.length > 0)
				this.SearchByRCode(entitie).then(result => resolve(result));
			else
				this.SearchByName(entitie).then(result => resolve(result));
		})
	}

	SearchById(entitie: ClientMdl) {
		return new Promise((resolve, reject) => {
			_instance.sync()
				.then(() => Client.scope("public").findOne({
					where: {
						id: entitie.id
					}
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

	SearchByName(entitie: ClientMdl) {
		return new Promise((resolve, reject) => {
			_instance.sync()
				.then(() => Client.scope("public").findOne({
					where: {
						firstName: entitie.firstName,
						lastName: entitie.lastName
					}
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

	SearchByRCode(entitie: ClientMdl) {
		return new Promise((resolve, reject) => {
			_instance.sync()
				.then(() => Client.scope("public").findOne({
					where: {
						registryCode: entitie.registryCode
					}
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
		type: DataTypes.INTEGER.UNSIGNED,
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

//Client.sync({force: false});

export { Client, ClientMdl };