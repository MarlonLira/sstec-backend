import { Op } from 'sequelize';

import { injectable } from "inversify";
import { IRouteSecurityRepository } from '../interfaces/IRepositories/route-securityRepository.interface';
import { RouteSecurity } from '../models/route-security.model';

@injectable()
export class RouteSecurityRepository implements IRouteSecurityRepository {

  save(routeSecurity: RouteSecurity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await RouteSecurity.sequelize.transaction();
      RouteSecurity.create(routeSecurity, { transaction: _transaction })
        .then(async (result: RouteSecurity) => {
          await _transaction.commit();
          resolve(result.id);
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(routeSecurity: RouteSecurity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await RouteSecurity.sequelize.transaction();
      RouteSecurity.update(routeSecurity.ToAny(),
        {
          where:
          {
            id: routeSecurity.id
          },
          transaction: _transaction,
          validate: false
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
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await RouteSecurity.sequelize.transaction();
      RouteSecurity.destroy(
        {
          where: {
            id: {
              [Op.eq]: id
            }
          },
          transaction: _transaction
        }
      )
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback()
          reject(error);;
        });
    });
  }

  getById(id: number): Promise<RouteSecurity> {
    throw new Error('Method not implemented.');
  }

  getByName(name: string): Promise<RouteSecurity[]> {
    throw new Error('Method not implemented.');
  }

  toList(): Promise<RouteSecurity[]> {
    return new Promise((resolve, reject) => {
      RouteSecurity.findAll()
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  getByCompanyId(id: number): Promise<RouteSecurity[]> {
    return new Promise((resolve, reject) => {
      RouteSecurity.findAll({
        where: {
          companyId: {
            [Op.eq]: id
          }
        }
      })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

}