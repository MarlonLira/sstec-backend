import User from '../../models/user';
import Card from '../../models/card';

interface ICardRepository {
  Save(card: Card);
  GetByUserCard(user: User);
}

export default ICardRepository;