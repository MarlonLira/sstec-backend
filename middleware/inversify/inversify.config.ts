import { Container } from 'inversify';

// Types
import TYPES from '../../data/types';

// Repositories
import UserRepository from '../../data/repositories/user.repository';
import UserAdressRepository from '../../data/repositories/user-adress.repository';
import { CardRepository } from '../../data/repositories/card.repository';
import { CompanyRepository } from '../../data/repositories/company.repository';
import { CompanyAdressRepository } from '../../data/repositories/company-adress.repository';
import { EmployeeRepository } from '../../data/repositories/employee.repository';
import PaymentRepository from '../../data/repositories/payment.repository';
import VehicleRepository from '../../data/repositories/vehicle.repository';
import ParkingRepository from '../../data/repositories/parking.repository';
import { RuleRepository } from '../../data/repositories/rule.repository';
import ParkingPromotionRepository from '../../data/repositories/parking-promotion.repository';
import { ParkingSpaceRepository } from '../../data/repositories/parking-space.repository';
import ParkingAdressRepository from '../../data/repositories/parking-adress.repository';
import { SchedulingRepository } from '../../data/repositories/scheduling.repository';
import ParkingScoreRepository from '../../data/repositories/parking-score.repository';
import ParkingFinanceRepository from '../../data/repositories/parking-finance.repository';
import { LogRepository } from '../../data/repositories/log.repository';
import { ParkingFileRepository } from '../../data/repositories/parkingFile.repository';

// Repositories interfaces
import IUserRepository from '../../data/interfaces/IRepositories/userRepository.interface';
import IUserAdressRepository from '../../data/interfaces/IRepositories/user-adressRepository.interface';
import ICardRepository from '../../data/interfaces/IRepositories/cardRepository.interface';
import { ICompanyRepository } from '../../data/interfaces/IRepositories/companyRepository.interface';
import { ICompanyAdressRepository } from '../../data/interfaces/IRepositories/company-adressRepository.interface';
import { IEmployeeRepository } from '../../data/interfaces/IRepositories/employeeRepository.interface';
import IPaymentRepository from '../../data/interfaces/IRepositories/paymentRepository.interface';
import { IParkingRepository } from '../../data/interfaces/IRepositories/parkingRepository.interface';
import { IParkingSpaceRepository } from '../../data/interfaces/IRepositories/parking-spaceRepository.interface';
import IVehicleRepository from '../../data/interfaces/IRepositories/vehicleRepository.interface';
import { IRuleRepository } from '../../data/interfaces/IRepositories/ruleRepository.interface';
import IParkingPromotionRepository from '../../data/interfaces/IRepositories/parking-promotionRepository.interface';
import { IParkingAdressRepository } from '../../data/interfaces/IRepositories/parking-adressRepository.interface';
import IParkingScoreRepository from '../../data/interfaces/IRepositories/parking-scoreRepository.interface';
import { ISchedulingRepository } from '../../data/interfaces/IRepositories/schedulingRepository.interface';
import IParkingFinanceRepository from '../../data/interfaces/IRepositories/parking-financeRepository.interface';
import { ILogRepository } from '../../data/interfaces/IRepositories/logRepository.interface';
import { IParkingFileRepository } from '../../data/interfaces/IRepositories/parkingFileRepository.interface';

// Services
import { AuthService } from '../../data/services/auth.service';
import { EmailService } from '../../data/services/email.service';
import { ParkingService } from '../../data/services/parking.service';
import { CompanyService } from '../../data/services/company.service';
import { RuleService } from '../../data/services/rule.service';
import { LogService } from '../../data/services/log.service';
import { ParkingAdressService } from '../../data/services/parking-adress.service';
import { UploadService } from '../../data/services/upload.service';
import { EmployeeService } from '../../data/services/employee.service';
import { CompanyAdressService } from '../../data/services/company-adress.service';
import { ParkingSpaceService } from '../../data/services/parking-space.service';
import { SchedulingService } from '../../data/services/scheduling.service';
import { ParkingScoreService } from '../../data/services/parking-score.service';
import { CardService } from '../../data/services/card.service';

// Services interfaces
import { IAuthService } from '../../data/interfaces/IServices/authService.interface';
import { IEmailService } from '../../data/interfaces/IServices/emailService.interface';
import { IParkingService } from '../../data/interfaces/IServices/parkingService.interface';
import { IRuleService } from '../../data/interfaces/IServices/ruleService.interface';
import { ILogService } from '../../data/interfaces/IServices/logService.interface';
import { IParkingAdressService } from '../../data/interfaces/IServices/parking-adressService.interface';
import { IUploadService } from '../../data/interfaces/IServices/uploadService.interface';
import { ICompanyService } from '../../data/interfaces/IServices/companyService.interface';
import { IEmployeeService } from '../../data/interfaces/IServices/employeeService.interface';
import { ICompanyAdressService } from '../../data/interfaces/IServices/company-adressService.interface';
import { IParkingSpaceService } from '../../data/interfaces/IServices/parking-spaceService.interface';
import { ISchedulingService } from '../../data/interfaces/IServices/schedulingService.interface';
import { IParkingScoreService } from '../../data/interfaces/IServices/parking-scoreService.interface';
import { ICardService } from '../../data/interfaces/IServices/cardService.interface';

// Binds
const container = new Container();

// Services Binds
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IEmailService>(TYPES.IEmailService).to(EmailService);
container.bind<IParkingService>(TYPES.IParkingService).to(ParkingService);
container.bind<ICompanyService>(TYPES.ICompanyService).to(CompanyService);
container.bind<ICompanyAdressService>(TYPES.ICompanyAdressService).to(CompanyAdressService);
container.bind<IParkingAdressService>(TYPES.IParkingAdressService).to(ParkingAdressService);
container.bind<IRuleService>(TYPES.IRuleService).to(RuleService);
container.bind<ILogService>(TYPES.ILogService).to(LogService);
container.bind<IUploadService>(TYPES.IUploadService).to(UploadService);
container.bind<IEmployeeService>(TYPES.IEmployeeService).to(EmployeeService);
container.bind<IParkingSpaceService>(TYPES.IParkingSpaceService).to(ParkingSpaceService);
container.bind<ISchedulingService>(TYPES.ISchedulingService).to(SchedulingService);
container.bind<IParkingScoreService>(TYPES.IParkingScoreService).to(ParkingScoreService);
container.bind<ICardService>(TYPES.ICardService).to(CardService);

// Repositories Binds
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IUserAdressRepository>(TYPES.IUserAdressRepository).to(UserAdressRepository);
container.bind<ICardRepository>(TYPES.ICardRepository).to(CardRepository);
container.bind<ICompanyRepository>(TYPES.ICompanyRepository).to(CompanyRepository);
container.bind<ICompanyAdressRepository>(TYPES.ICompanyAdressRepository).to(CompanyAdressRepository);
container.bind<IEmployeeRepository>(TYPES.IEmployeeRepository).to(EmployeeRepository);
container.bind<IPaymentRepository>(TYPES.IPaymentRepository).to(PaymentRepository);
container.bind<IVehicleRepository>(TYPES.IVehicleRepository).to(VehicleRepository);
container.bind<IParkingRepository>(TYPES.IParkingRepository).to(ParkingRepository);
container.bind<IRuleRepository>(TYPES.IRuleRepository).to(RuleRepository);
container.bind<IParkingPromotionRepository>(TYPES.IParkingPromotionRepository).to(ParkingPromotionRepository);
container.bind<IParkingSpaceRepository>(TYPES.IParkingSpaceRepository).to(ParkingSpaceRepository);
container.bind<IParkingAdressRepository>(TYPES.IParkingAdressRepository).to(ParkingAdressRepository);
container.bind<ISchedulingRepository>(TYPES.ISchedulingRepository).to(SchedulingRepository);
container.bind<IParkingScoreRepository>(TYPES.IParkingScoreRepository).to(ParkingScoreRepository);
container.bind<IParkingFinanceRepository>(TYPES.IParkingFinanceRepository).to(ParkingFinanceRepository);
container.bind<ILogRepository>(TYPES.ILogRepository).to(LogRepository);
container.bind<IParkingFileRepository>(TYPES.IParkingFileRepository).to(ParkingFileRepository);

export default container;