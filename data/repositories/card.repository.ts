import { Op } from 'sequelize';
import { injectable } from "inversify";

import ICardRepository from '../interfaces/IRepositories/cardRepository.interface';
import { Card } from '../models/card.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class CardRepository implements ICardRepository {

  save(card: Card): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Card.sequelize.transaction();
      card.status = TransactionType.ACTIVE;
      Card.create(card, { transaction: _transaction })
        .then(async (result: Card) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error)
        });
    });
  }

  getById(id: number): Promise<Card> {
    return new Promise(async (resolve, reject) => {
      Card.findByPk(id)
        .then((card: Card) => resolve(card))
        .catch(error => reject(error));
    });
  }

  getByUserId(userId: number): Promise<Card[]> {
    return new Promise(async (resolve, reject) => {
      Card.findAll(
        {
          where: {
            userId: userId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((cards: Card[]) => resolve(cards))
        .catch(error => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Card.sequelize.transaction();
      Card.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: _id
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

  update(card: Card): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Card.sequelize.transaction();
      Card.update(card.ToModify(),
        {
          where:
          {
            id: card.id
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
}