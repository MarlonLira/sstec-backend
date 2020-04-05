import { Container } from 'inversify';

//Types
import TYPES from '../../data/types';

//Repositories
import UserRepository from '../../data/repositories/userRepository';
import CardRepository from '../../data/repositories/cardRepository';

//Services
import AuthService from '../../data/services/authService';

//interfaces
import IUserRepository from '../../data/interfaces/IRepositories/IUserRepository';
import ICardRepository from '../../data/interfaces/IRepositories/ICardRepository';
import IAuthService from '../../data/interfaces/IServices/IAuthService';

const container = new Container();
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<ICardRepository>(TYPES.ICardRepository).to(CardRepository);
container.bind<IAuthService>(TYPES.IAuthService, ).to(AuthService);

export default container;