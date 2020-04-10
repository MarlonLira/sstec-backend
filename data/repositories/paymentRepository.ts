import { Op } from 'sequelize';
import { injectable } from "inversify";

import IPaymentRepository from '../interfaces/IRepositories/IPaymentRepository';
import Payment from '../models/payment';
import Card from '../models/card';
import User from '../models/user';

/**
 * @description
 * @author Emerson Souza
 * @class PaymentRepository
 * @implements {IPaymentRepository}
 */
@injectable()
class PaymentRepository implements IPaymentRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {Payment} payment
   * @memberof PaymentRepository
   */
  Save(payment: Payment) {
    return new Promise((resolve) => {
      Payment.create({
        status: 'AT',
        value: payment.value,
        cardId: payment.cardId,
        parkingSpaceId: payment.parkingSpaceId
      }).then(result => {
        resolve(result);
      }).catch(error => {
        throw error;
      })
    })
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Card} card
   * @memberof PaymentRepository
   */
  GetPaymentsByCard(card: Card) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {User} user
   * @memberof PaymentRepository
   */
  GetPaymentsByUser(user: User) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @memberof PaymentRepository
   */
  GetPaymentById(id: number) {
    throw new Error("Method not implemented.");
  }
}

export default PaymentRepository;