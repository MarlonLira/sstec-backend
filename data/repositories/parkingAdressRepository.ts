import { Op, Transaction } from 'sequelize';
import { injectable, id } from "inversify";
import IparkingAdressRepository from '../interfaces/IRepositories/IParkingAdressRepository';
import ParkingAdress from '../models/parkingAdress';
import Parking from '../models/parking';
import Attributes from '../../commons/core/attributes';
import Querying from '../../commons/core/querying';
import { rejects } from 'assert';
import { TransactionType } from '../../commons/enums/transactionType';
import { resolve } from 'dns';

@injectable()
class ParkingAdressRepository implements IparkingAdressRepository {


    Update(parkingAdress: ParkingAdress) {
        return new Promise(async (resolve, reject) => {
            const _transaction = await ParkingAdress.sequelize.transaction();
            ParkingAdress.findByPk(parkingAdress.id)
                .then((result: ParkingAdress) => {
                    if (!Attributes.ReturnIfValid(result)) {
                        reject('Endereço do Parking não cadastrado')
                    }
                    ParkingAdress.update({
                        status: Attributes.ReturnIfValid(parkingAdress.status),
                        country: Attributes.ReturnIfValid(parkingAdress.country),
                        state: Attributes.ReturnIfValid(parkingAdress.state),
                        city: Attributes.ReturnIfValid(parkingAdress.city),
                        street: Attributes.ReturnIfValid(parkingAdress.street),
                        number: Attributes.ReturnIfValid(parkingAdress.number),
                        zipCode: Attributes.ReturnIfValid(parkingAdress.zipCode),
                        latitude: Attributes.ReturnIfValid(parkingAdress.latitude),
                        longitude: Attributes.ReturnIfValid(parkingAdress.longitude),
                        complement: Attributes.ReturnIfValid(parkingAdress.complement)
                    },
                        {
                            where: {
                                id: parkingAdress.id
                            },
                            transaction: _transaction
                        })
                        .then(result => {
                            _transaction.commit();
                            resolve(result);
                        })
                        .catch(error => {
                            _transaction.rollback();
                            reject(error);
                        });
                });
        });
    }

    Save(parkingAdress: ParkingAdress, parkingId: number) {
        return new Promise(async (resolve, reject) => {
            const _transaction = await ParkingAdress.sequelize.transaction();
            Parking.findByPk(parkingId)
                .then((parking: Parking) => {
                    parkingAdress.status = 'AT'
                    ParkingAdress.create(parkingAdress, { transaction: _transaction })
                        .then((createPakingAdress: ParkingAdress) => {
                            _transaction.commit();
                            resolve({ "ParkingAdress": createPakingAdress.id })
                        }).catch(error => {
                            _transaction.rollback();
                            reject(error);
                        });

                });
        });
    }


    Delete(id: number) {
      return new Promise(async (resolve, reject) => {
          const _transaction = await ParkingAdress.sequelize.transaction();
          ParkingAdress.update({ status: TransactionType.DELETED },
        {
            where: { id: id },
            transaction: _transaction
        })
       .then(async result =>{
           await _transaction.commit();
           resolve(result);
       })  
       .catch(async error => {
           await _transaction.rollback();
           reject(error);
       });
      })
    }

    GetById(parkingAdressId: number) {
        return new Promise((resolve, reject) => {
            ParkingAdress.findOne({
                where: {
                    id: parkingAdressId
                }
            })
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    rejects(error);
                })
        })
    }
    ToList(parkingAdress: ParkingAdress) {
        throw new Error("Method not implemented.");
    }

}

export default ParkingAdressRepository;