import { Container } from 'inversify';

//Types
import TYPES from '../../data/types';

//Repositories
import UserRepository from '../../data/repositories/userRepository';
import CardRepository from '../../data/repositories/cardRepository';
import CompanyRepository from '../../data/repositories/companyRepository';
import CompanyAdressRepository from '../../data/repositories/companyAdressRepository';
import EmployeeRepository from '../../data/repositories/employeeRepository';
import PaymentRepository from '../../data/repositories/paymentRepository';
import VehicleRepository from '../../data/repositories/vehicleRepository';
import ParkingRepository from '../../data/repositories/ParkingRepository';

//Services
import AuthService from '../../data/services/authService';

//interfaces
import IUserRepository from '../../data/interfaces/IRepositories/IUserRepository';
import ICardRepository from '../../data/interfaces/IRepositories/ICardRepository';
import ICompanyRepository from '../../data/interfaces/IRepositories/ICompanyRepository';
import ICompanyAdressRepository from '../../data/interfaces/IRepositories/ICompanyAdressRepository';
import IEmployeeRepository from '../../data/interfaces/IRepositories/IEmployeeRepository';
import IPaymentRepository from '../../data/interfaces/IRepositories/IPaymentRepository';
import IParkingRepository from '../../data/interfaces/IRepositories/IParkingRepository';
import IVehicleRepository from '../../data/interfaces/IRepositories/IVehicleRepository';
import IAuthService from '../../data/interfaces/IServices/IAuthService';

const container = new Container();
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<ICardRepository>(TYPES.ICardRepository).to(CardRepository);
container.bind<ICompanyRepository>(TYPES.ICompanyRepository).to(CompanyRepository);
container.bind<ICompanyAdressRepository>(TYPES.ICompanyAdressRepository).to(CompanyAdressRepository);
container.bind<IEmployeeRepository>(TYPES.IEmployeeRepository).to(EmployeeRepository);
container.bind<IPaymentRepository>(TYPES.IPaymentRepository).to(PaymentRepository);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IVehicleRepository>(TYPES.IVehicleRepository).to(VehicleRepository);
container.bind<IParkingRepository>(TYPES.IParkingRepository).to(ParkingRepository);

export default container;