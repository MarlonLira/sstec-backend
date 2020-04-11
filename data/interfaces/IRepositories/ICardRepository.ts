import User from '../../models/user';
import Card from '../../models/card';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICardRepository
 */
interface ICardRepository {
  Save(card: Card, userId: number);
  GetByUser(user: User);
  Find(card: Card, properties: string[]);
  Delete(card: Card);
  Update(card: Card);
}

export default ICardRepository;