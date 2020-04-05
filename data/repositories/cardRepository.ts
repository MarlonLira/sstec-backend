import { Op } from 'sequelize';

import ICardRepository from '../interfaces/IRepositories/ICardRepository';
import User from '../models/user';
import Card from '../models/card';
import { Querying } from '../../commons/helpers';
import { injectable } from "inversify";

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
   * @memberof CardRepository
   */
  Save(card: Card) {
    return new Promise((resolve, reject) => {
      Card.create({
        status: 'AT',
        holder: card.holder,
        number: card.number,
        secureCode: card.secureCode,
        type: card.type
      }).then(result => {
        resolve(result);
      }).catch(error => {
        throw (error);
      })
    })
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {User} user
   * @memberof CardRepository
   */
  GetByUserCard(user: User) {
    throw new Error("Method not implemented.");
  }

}

export default CardRepository;