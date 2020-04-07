import Payment from '../../models/payment';
import User from '../../models/user';
import Card from '../../models/card';

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