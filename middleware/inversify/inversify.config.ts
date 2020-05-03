import { Container } from 'inversify';

// Types
import TYPES from '../../data/types';

// Repositories
import UserRepository from '../../data/repositories/userRepository';
import UserAdressRepository from '../../data/repositories/userAdressRepository';
import CardRepository from '../../data/repositories/cardRepository';
import CompanyRepository from '../../data/repositories/companyRepository';
import CompanyAdressRepository from '../../data/repositories/companyAdressRepository';
import EmployeeRepository from '../../data/repositories/employeeRepository';
import PaymentRepository from '../../data/repositories/paymentRepository';
import VehicleRepository from '../../data/repositories/vehicleRepository';
import ParkingRepository from '../../data/repositories/ParkingRepository';
import RuleRepository from '../../data/repositories/RuleRepository';
import ParkingPromotionRepository from '../../data/repositories/parkingPromotionRepository';
import ParkingSpaceRepository from '../../data/repositories/parkingSpaceRepository';
import ParkingAdressRepository from '../../data/repositories/parkingAdressRepository';
import SchedulingRepository from '../../data/repositories/schedulingRepository';
import ParkingScoreRepository from '../../data/repositories/parkingScoreRepository';
import ParkingFinanceRepository from '../../data/repositories/parkingFinanceRepository';

// Services
import AuthService from '../../data/services/authService';

// interfaces
import IUserRepository from '../../data/interfaces/IRepositories/IUserRepository';
import IUserAdressRepository from '../../data/interfaces/IRepositories/IUserAdressRepository';
import ICardRepository from '../../data/interfaces/IRepositories/ICardRepository';
import ICompanyRepository from '../../data/interfaces/IRepositories/ICompanyRepository';
import ICompanyAdressRepository from '../../data/interfaces/IRepositories/ICompanyAdressRepository';
import IEmployeeRepository from '../../data/interfaces/IRepositories/IEmployeeRepository';
import IPaymentRepository from '../../data/interfaces/IRepositories/IPaymentRepository';
import IParkingRepository from '../../data/interfaces/IRepositories/IParkingRepository';
import IParkingSpaceRepository from '../../data/interfaces/IRepositories/IParkingSpaceRepository';
import IVehicleRepository from '../../data/interfaces/IRepositories/IVehicleRepository';
import IRuleRepository from '../../data/interfaces/IRepositories/IRuleRepository';
import IParkingPromotionRepository from '../../data/interfaces/IRepositories/IParkingPromotionRepository';
import IParkingAdressRepository from '../../data/interfaces/IRepositories/IParkingAdressRepository';
import IParkingScoreRepository from '../../data/interfaces/IRepositories/IParkingScoreRepository';
import ISchedulingRepository from '../../data/interfaces/IRepositories/ISchedulingRepository';
import IParkingFinanceRepository from '../../data/interfaces/IRepositories/IParkingFinanceRepository';
import IAuthService from '../../data/interfaces/IServices/IAuthService';

// Binds
const container = new Container();
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IUserAdressRepository>(TYPES.IUserAdressRepository).to(UserAdressRepository);
container.bind<ICardRepository>(TYPES.ICardRepository).to(CardRepository);
container.bind<ICompanyRepository>(TYPES.ICompanyRepository).to(CompanyRepository);
container.bind<ICompanyAdressRepository>(TYPES.ICompanyAdressRepository).to(CompanyAdressRepository);
container.bind<IEmployeeRepository>(TYPES.IEmployeeRepository).to(EmployeeRepository);
container.bind<IPaymentRepository>(TYPES.IPaymentRepository).to(PaymentRepository);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IVehicleRepository>(TYPES.IVehicleRepository).to(VehicleRepository);
container.bind<IParkingRepository>(TYPES.IParkingRepository).to(ParkingRepository);
container.bind<IRuleRepository>(TYPES.IRuleRepository).to(RuleRepository);
container.bind<IParkingPromotionRepository>(TYPES.IParkingPromotionRepository).to(ParkingPromotionRepository);
container.bind<IParkingSpaceRepository>(TYPES.IParkingSpaceRepository).to(ParkingSpaceRepository);
container.bind<IParkingAdressRepository>(TYPES.IParkingAdressRepository).to(ParkingAdressRepository);
container.bind<ISchedulingRepository>(TYPES.ISchedulingRepository).to(SchedulingRepository);
container.bind<IParkingScoreRepository>(TYPES.IParkingScoreRepository).to(ParkingScoreRepository);
container.bind<IParkingFinanceRepository> (TYPES.IParkingFinanceRepository).to(ParkingFinanceRepository);

export default container;