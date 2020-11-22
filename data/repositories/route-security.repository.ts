import { Op } from 'sequelize';

import { injectable } from "inversify";
import { IRouteSecurityRepository } from '../interfaces/IRepositories/route-securityRepository.interface';
import { RouteSecurity, RouteSecurityDAO } from '../models/route-security.model';

@injectable()
export class RouteSecurityRepository implements IRouteSecurityRepository {

  save(routeSecurity: RouteSecurity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await RouteSecurityDAO.sequelize.transaction();
      RouteSecurityDAO.create(routeSecurity, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(routeSecurity: RouteSecurity): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await RouteSecurityDAO.sequelize.transaction();
      RouteSecurityDAO.update(routeSecurity,
        {
          where: {
            id: { [Op.eq]: routeSecurity.id }
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await RouteSecurityDAO.sequelize.transaction();
      RouteSecurityDAO.destroy(
        {
          where: {
            id: { [Op.eq]: id }
          },
          transaction: _transaction
        }
      )
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
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
      RouteSecurityDAO.findAll()
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByCompanyId(id: number): Promise<RouteSecurity[]> {
    return new Promise((resolve, reject) => {
      RouteSecurityDAO.findAll({
        where: {
          companyId: { [Op.eq]: id }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

}