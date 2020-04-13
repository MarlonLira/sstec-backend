import ICardRepository from '../interfaces/IRepositories/ICardRepository';
import User from '../models/user';
import Card from '../models/card';
import Querying from '../../commons/core/querying';
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
   * @author Gustavo Gusmão
   * @param {Card} card
   * @param {string[]} properties
   * @returns
   * @memberof CardRepository
   */
  Find(card: Card, properties: string[], operator: any) {
    return new Promise((resolve, reject) => {
      let query: any;
      query = Querying[operator](card, properties);
      Card.findAll({
        where: query
      }).then(result => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
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
   * @author Marlon Lira
   * @param {Card} card
   * @param {User} user
   * @returns
   * @memberof CardRepository
   */
  public SaveInUser(card: Card, user: User) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Card.sequelize.transaction();
      user.addCard(card, { transaction: _transaction })
        .then(async () => {
          await _transaction.commit();
          resolve({ "cardId": card.id });
        })
        .catch(async (error) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Card} card
   * @param {User} user
   * @returns
   * @memberof CardRepository
   */
  public Save(card: Card, user: User) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Card.sequelize.transaction();
      card.status = TransactionType.ACTIVE;
      Card.create(card, { transaction: _transaction })
        .then((result: Card) => {
          user.addCard(result, { transaction: _transaction })
            .then(async () => {
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