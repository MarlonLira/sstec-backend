import { Op } from 'sequelize';

import ICardRepository from '../interfaces/IRepositories/ICardRepository';
import User from '../models/user';
import Card from '../models/card';
import Querying from '../../commons/core/querying';
import { injectable } from "inversify";
import Attributes from '../../commons/core/attributes';
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
   * @author Gustavo Gusmão
   * @param {Card} card
   * @param {string[]} properties
   * @returns
   * @memberof CardRepository
   */
  Find(card: Card, properties: string[]) {
    return new Promise((resolve, reject) => {
      let query: any;
      query = Querying.ReturnEqualQuery(card, properties);
      Card.findAll({
        where: query
      }).then(result => {
        resolve(result);
      }).catch(error => {
        reject(error);
      })
    });
  }
  Delete(card: Card) {
    throw new Error("Method not implemented.");
  }
  Update(card: Card) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Card} card
   * @param {number} userId
   * @returns
   * @memberof CardRepository
   */
  Save(card: Card, userId: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Card.sequelize.transaction();
      User.findByPk(userId)
        .then((_user: User) => {
          if (!Attributes.IsValid(_user)) {
            reject('Usuário não encontrado!');
          }
          this.Find(card, ['number', 'flag'])
            .then(async (foundCard: Card) => {
              if (!Attributes.IsValid(foundCard)) {
                card.status = TransactionType.ACTIVE;
                this.SaveCard(card, _transaction, _user)
                  .then(resolveCardId => {
                    resolve(resolveCardId);
                  })
                  .catch(error => {
                    reject(error);
                  })
              } else {
                await _user.getCards()
                  .then((cards: Card[]) => {
                    cards.forEach(foundCard => {
                      this.Find(foundCard, ['number', 'flag'])
                        .then(resolve => {
                          if (Attributes.IsValid(resolve))
                            reject('Usuário já contem esse cartão');
                        })
                    })
                  })
                _user.addCard(foundCard, { transaction: _transaction })
                  .then(async () => {
                    await _transaction.commit();
                    resolve({ "cardId": foundCard.id });
                  })
                  .catch(async (error) => {
                    await _transaction.rollback();
                    reject(error);
                  });
              }
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @private
   * @param {Card} card
   * @param {*} _transaction
   * @param {User} _user
   * @returns
   * @memberof CardRepository
   */
  private SaveCard(card: Card, _transaction, _user: User) {
    return new Promise(async (resolve, reject) => {
      Card.create(card, { transaction: _transaction })
        .then((result: Card) => {
          _user.addCard(result, { transaction: _transaction })
            .then(async (relation) => {
              await _transaction.commit();
              resolve({ "cardId": result.id });
            })
            .catch(async (error) => {
              await _transaction.rollback();
              reject(error);
            });
        })
        .catch(async (error) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {User} user
   * @memberof CardRepository
   */
  GetByUser(user: User) {
    throw new Error("Method not implemented.");
  }

}

export default CardRepository;