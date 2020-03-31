import { Container } from 'inversify';
import USER_TYPES from './data/types/userTypes';
import AUTH_TYPES from './data/types/authTypes';
import UserRepository from './data/repositories/userRepository';
import IUserRepository from './data/interfaces/IUserRepository';
import AuthService from './data/services/authService';
import IAuthService from './data/interfaces/IAuthService';

const container = new Container();

container.bind<IUserRepository>(USER_TYPES.IUserRepository).to(UserRepository);
container.bind<IAuthService>(AUTH_TYPES.IAuthService, ).to(AuthService);

export default container;