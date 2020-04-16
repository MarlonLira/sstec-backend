import { Op } from 'sequelize';

import ICardRepository from '../interfaces/IRepositories/ICardRepository';
import Card from '../models/card';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Gustavo Gusmão
 * @class CardRepository
 * @implements {ICardRepository}
 */
@injectable()
class CardRepository implements ICardRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {Card} card
   * @returns {Promise<any>}
   * @memberof CardRepository
   */
  Save(card: Card): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Card.sequelize.transaction();
      Card.create(card, { transaction: _transaction })
        .then(async (createdCard: Card) => {
          await _transaction.commit();
          resolve({ "cardId": createdCard.id })
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error)
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<Card>}
   * @memberof CardRepository
   */
  GetById(id: number): Promise<Card> {
    return new Promise(async (resolve, reject) => {
      Card.findByPk(id)
        .then((foundCard: Card) => {
          resolve(foundCard)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  GetByUserId(_userId: number): Promise<Card[]> {
    return new Promise(async (resolve, reject) => {
      Card.findAll(
        {
          where: {
            userId: _userId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((foundCards: Card[]) => {
          resolve(foundCards);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  Delete(card: Card): Promise<any> {
    throw new Error("Method not implemented.");
  }

  Update(card: Card): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default CardRepository;