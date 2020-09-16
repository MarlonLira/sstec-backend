import Payment from '../../models/payment.model';
import User from '../../models/user.model';
import { Card } from '../../models/card.model';

/**
 * @description
 * @author Emerson Souza
 * @interface IPaymentRepository
 */
interface IPaymentRepository {
  Save(payment: Payment);
  GetPaymentsByCard(card: Card);
  GetPaymentsByUser(user: User);
  GetPaymentById(id: number);
}

export default IPaymentRepository;