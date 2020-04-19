import User from '../../models/user';
import Card from '../../models/card';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICardRepository
 */
interface ICardRepository {
  Save(card: Card): Promise<any>;
  GetById(id: number): Promise<Card>;
  GetByUserId(userId: number): Promise<Card[]>;
  Delete(card: Card): Promise<any>;
  Update(card: Card): Promise<any>;
}

export default ICardRepository;