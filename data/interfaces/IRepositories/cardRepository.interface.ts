import { Card } from '../../models/card.model';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICardRepository
 */
interface ICardRepository {
  save(card: Card): Promise<any>;
  getById(id: number): Promise<Card>;
  getByUserId(userId: number): Promise<Card[]>;
  delete(id: number): Promise<any>;
  update(card: Card): Promise<any>;
}

export default ICardRepository;