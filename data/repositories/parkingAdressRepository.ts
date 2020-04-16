import { injectable, id } from "inversify";
import IParkingAdressRepository from '../interfaces/IRepositories/IParkingAdressRepository';
import ParkingAdress from '../models/parkingAdress';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
class ParkingAdressRepository implements IParkingAdressRepository {


  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingAdress} parkingAdress
   * @returns
   * @memberof ParkingAdressRepository
   */
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


  /**
   * @description
   * @author Felipe Seabra
   * @param {ParkingAdress} parkingAdress
   * @memberof ParkingAdressRepository
   */
  Save(parkingAdress: ParkingAdress) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAdress.sequelize.transaction();
      parkingAdress.status = TransactionType.ACTIVE;
      ParkingAdress.create(parkingAdress, { transaction: _transaction })
        .then(async (createParkingAdress: ParkingAdress) => {
          await _transaction.commit();
          resolve({ "ParkingAdress": createParkingAdress.id })
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }


  /**
   * @description
   * @author Felipe Seabra
   * @param {number} id
   * @returns
   * @memberof ParkingAdressRepository
   */
  Delete(_id: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAdress.sequelize.transaction();
      this.GetById(_id)
        .then((result: ParkingAdress) => {
          result.status = TransactionType.DELETED
          ParkingAdress.update(result.toJSON(),
            {
              where: { id: _id },
              transaction: _transaction
            })
            .then(async result => {
              await _transaction.commit();
              resolve(result);
            })
            .catch(async error => {
              await _transaction.rollback();
              reject(error);
            });
        });
    });
  }


  /**
   * @description
   * @author Felipe Seabra
   * @param {number} parkingAdressId
   * @returns
   * @memberof ParkingAdressRepository
   */
  GetById(parkingAdressId: number) {
    return new Promise((resolve, reject) => {
      ParkingAdress.findByPk(parkingAdressId)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  ToList() {
    return new Promise((resolve, reject) => {
      ParkingAdress.findAll()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default ParkingAdressRepository;