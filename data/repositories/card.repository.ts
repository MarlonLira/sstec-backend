import { Op } from 'sequelize';
import { injectable } from "inversify";

import { ICardRepository } from '../interfaces/IRepositories/cardRepository.interface';
import { Card, CardDAO } from '../models/card.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class CardRepository implements ICardRepository {

  save(card: Card): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CardDAO.sequelize.transaction();
      card.status = TransactionType.ACTIVE;
      CardDAO.create(card, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Card(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error)
        });
    });
  }

  getById(id: number): Promise<Card> {
    return new Promise(async (resolve, reject) => {
      CardDAO.findByPk(id)
        .then((card: any) => resolve(new Card(card)))
        .catch((error: any) => reject(error));
    });
  }

  getByUserId(_userId: number): Promise<Card[]> {
    return new Promise(async (resolve, reject) => {
      CardDAO.findAll(
        {
          where: {
            userId: _userId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((cards: any) => resolve(cards))
        .catch((error: any) => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CardDAO.sequelize.transaction();
      CardDAO.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: _id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Card(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(card: Card): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CardDAO.sequelize.transaction();
      CardDAO.update(card,
        {
          where:
          {
            id: card.id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new Card(result));
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
}