import { Op } from 'sequelize';

import ICardRepository from '../interfaces/IRepositories/cardRepository.interface';
import Card from '../models/card.model';
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
      card.status = TransactionType.ACTIVE;
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _userId
   * @returns {Promise<Card[]>}
   * @memberof CardRepository
   */
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _id
   * @returns {Promise<any>}
   * @memberof CardRepository
   */
  Delete(_id: number): Promise<any> {
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Card} card
   * @returns {Promise<any>}
   * @memberof CardRepository
   */
  Update(card: Card): Promise<any> {
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

export default CardRepository;