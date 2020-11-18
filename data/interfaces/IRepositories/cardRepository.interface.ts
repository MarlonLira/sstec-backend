import { Card } from '../../models/card.model';

export interface ICardRepository {
  save(card: Card): Promise<any>;
  getById(id: number): Promise<Card>;
  getByUserId(userId: number): Promise<Card[]>;
  delete(id: number): Promise<any>;
  update(card: Card): Promise<any>;
}