import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import * as db from '../db';
import IEntitie from './IEntitie';
import { DbInstance } from '../db'

var _instance = new DbInstance().getInstance();

class ClientMdl {
	public id!: number;
	public firstName!: string;
	public lastName!: string;
	public phone!: string;
}

class Client extends Model implements IEntitie {

	public id!: number;
	public firstName!: string;
	public lastName!: string;
	public phone!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	Save(value: ClientMdl) {
		_instance.sync()
			.then(() => Client.create({
				firstName: value.firstName,
				lastName: value.lastName,
				phone: value.phone
			}))
			.then(j => {
				console.log(j.toJSON());
			});
	}
	Search(value: ClientMdl) {
		return new Promise((resolve, reject) => {
			_instance.sync()
				.then(() => Client.scope("public").findOne({
					where: {
						id: value.id
					}
				}))
				.then(j => {
					let found = j == null ? null : j.dataValues;
					resolve(found)
				})
				.catch(j => {
					reject(j)
				});
		})
	}

	Update(value: ClientMdl) {
		return new Promise((resolve, reject) => {
			this.Search(value).then(x => {
				if (x == null) { return resolve("Cliente não encontrado!") }
				_instance.sync()
					.then(() => Client.update({
						firstName: value.firstName,
						lastName: value.lastName,
						phone: value.phone
					},
						{
							where: {
								id: value.id
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
						let result = "Cliente Atualizado!";
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
	phone: {
		type: new DataTypes.STRING(12),
		allowNull: false,
	}
}, {
	sequelize: new db.DbInstance().getInstance(),
	tableName: 'Client',
	scopes: {
		public: {
			attributes: ['id', 'firstName', 'lastName', 'phone']
		}
	}
});

//Client.sync({force: false});

export { Client, ClientMdl };