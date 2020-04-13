import User from '../../models/user';
import Card from '../../models/card';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICardRepository
 */
interface ICardRepository {
  Save(card: Card, user: User);
  SaveInUser(card: Card, user: User);
  GetByUser(user: User);
  Find(card: Card, properties: string[], operator: any);
  Delete(card: Card);
  Update(card: Card);
}

export default ICardRepository;