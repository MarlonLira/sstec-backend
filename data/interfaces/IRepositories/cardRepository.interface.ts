import Card from '../../models/card.model';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICardRepository
 */
interface ICardRepository {
  Save(card: Card): Promise<any>;
  GetById(id: number): Promise<Card>;
  GetByUserId(userId: number): Promise<Card[]>;
  Delete(_id: number): Promise<any>;
  Update(card: Card): Promise<any>;
}

export default ICardRepository;