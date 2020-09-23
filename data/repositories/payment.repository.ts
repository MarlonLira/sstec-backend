import { injectable } from "inversify";

import IPaymentRepository from '../interfaces/IRepositories/paymentRepository.interface';
import Payment from '../models/payment.model';
import { Card } from '../models/card.model';
import { User } from '../models/user.model';
import { TransactionType } from '../../commons/enums/transactionType';

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
    return new Promise((resolve, reject) => {
      payment.status = TransactionType.ACTIVE;
      Payment.create(payment)
        .then(result => {
          resolve(result);
        }).catch(error => {
          reject(error);
        });
    });
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