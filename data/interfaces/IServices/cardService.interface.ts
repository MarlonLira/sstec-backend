import { Card } from "../../models/card.model";

export interface ICardService {
  save(card: Card): Promise<any>;
  update(card: Card): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<Card>;
  getByUserId(userId: number): Promise<Card[]>
}