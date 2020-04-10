import User from '../../models/user';
import Card from '../../models/card';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICardRepository
 */
interface ICardRepository {
  Save(card: Card);
  GetByUserCard(user: User);
}

export default ICardRepository;