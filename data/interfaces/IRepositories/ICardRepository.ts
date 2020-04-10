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
  delete(card: Card);
  update(card: Card);
}

export default ICardRepository;