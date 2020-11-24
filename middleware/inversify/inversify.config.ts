import { Container } from 'inversify';

// Types
import TYPES from '../../data/types';

// Repositories
import { UserRepository } from '../../data/repositories/user.repository';
import { UserAddressRepository } from '../../data/repositories/user-address.repository';
import { CardRepository } from '../../data/repositories/card.repository';
import { CompanyRepository } from '../../data/repositories/company.repository';
import { CompanyAddressRepository } from '../../data/repositories/company-address.repository';
import { EmployeeRepository } from '../../data/repositories/employee.repository';
import { VehicleRepository } from '../../data/repositories/vehicle.repository';
import { ParkingRepository } from '../../data/repositories/parking.repository';
import { RuleRepository } from '../../data/repositories/rule.repository';
import { ParkingSpaceRepository } from '../../data/repositories/parking-space.repository';
import { ParkingAddressRepository } from '../../data/repositories/parking-address.repository';
import { SchedulingRepository } from '../../data/repositories/scheduling.repository';
import { ParkingScoreRepository } from '../../data/repositories/parking-score.repository';
import { ParkingFinanceRepository } from '../../data/repositories/parking-finance.repository';
import { LogRepository } from '../../data/repositories/log.repository';
import { ParkingFileRepository } from '../../data/repositories/parkingFile.repository';
import { RouteSecurityRepository } from '../../data/repositories/route-security.repository';
import { FavoriteParkingRepository } from '../../data/repositories/favorite-parking.repository';
import { ParkingProductRepository } from '../../data/repositories/parking-product.repository';
import { SchedulingProductRepository } from '../../data/repositories/scheduling-product.repository';
import { ParkingPriceRepository } from '../../data/repositories/parking-price.repository';

// Repositories interfaces
import { IUserRepository } from '../../data/interfaces/IRepositories/userRepository.interface';
import { IUserAddressRepository } from '../../data/interfaces/IRepositories/user-addressRepository.interface';
import { ICardRepository } from '../../data/interfaces/IRepositories/cardRepository.interface';
import { ICompanyRepository } from '../../data/interfaces/IRepositories/companyRepository.interface';
import { ICompanyAddressRepository } from '../../data/interfaces/IRepositories/company-addressRepository.interface';
import { IEmployeeRepository } from '../../data/interfaces/IRepositories/employeeRepository.interface';
import { IParkingRepository } from '../../data/interfaces/IRepositories/parkingRepository.interface';
import { IParkingSpaceRepository } from '../../data/interfaces/IRepositories/parking-spaceRepository.interface';
import { IVehicleRepository } from '../../data/interfaces/IRepositories/vehicleRepository.interface';
import { IRuleRepository } from '../../data/interfaces/IRepositories/ruleRepository.interface';
import { IParkingAddressRepository } from '../../data/interfaces/IRepositories/parking-addressRepository.interface';
import { IParkingScoreRepository } from '../../data/interfaces/IRepositories/parking-scoreRepository.interface';
import { ISchedulingRepository } from '../../data/interfaces/IRepositories/schedulingRepository.interface';
import { IParkingFinanceRepository } from '../../data/interfaces/IRepositories/parking-financeRepository.interface';
import { ILogRepository } from '../../data/interfaces/IRepositories/logRepository.interface';
import { IParkingFileRepository } from '../../data/interfaces/IRepositories/parkingFileRepository.interface';
import { IRouteSecurityRepository } from '../../data/interfaces/IRepositories/route-securityRepository.interface';
import { IFavoriteParkingRepository } from '../../data/interfaces/IRepositories/favorite-parkingRepository.interface';
import { IParkingProductRepository } from '../../data/interfaces/IRepositories/parking-productRepository.interface';
import { ISchedulingProductRepository } from '../../data/interfaces/IRepositories/scheduling-productRepository.interface';
import { IParkingPriceRepository } from '../../data/interfaces/IRepositories/parking-priceRepository.interface';

// Services
import { AuthService } from '../../data/services/auth.service';
import { EmailService } from '../../data/services/email.service';
import { ParkingService } from '../../data/services/parking.service';
import { CompanyService } from '../../data/services/company.service';
import { RuleService } from '../../data/services/rule.service';
import { LogService } from '../../data/services/log.service';
import { ParkingAddressService } from '../../data/services/parking-address.service';
import { ParkingFileService } from '../../data/services/parking-file.service';
import { EmployeeService } from '../../data/services/employee.service';
import { CompanyAddressService } from '../../data/services/company-address.service';
import { ParkingSpaceService } from '../../data/services/parking-space.service';
import { ParkingFinanceService } from '../../data/services/parking-finance.service';
import { SchedulingService } from '../../data/services/scheduling.service';
import { ParkingScoreService } from '../../data/services/parking-score.service';
import { CardService } from '../../data/services/card.service';
import { UserAddressService } from '../../data/services/user-address.service';
import { UserService } from '../../data/services/user.service';
import { VehicleService } from '../../data/services/vehicle.service';
import { RouteSecurityService } from '../../data/services/route-security.service';
import { FavoriteParkingService } from '../../data/services/favorite-parking.service';
import { ParkingProductService } from '../../data/services/parking-product.service';
import { SchedulingProductService } from '../../data/services/scheduling-product.service';
import { ParkingPriceService } from '../../data/services/parking-price.service';

// Services interfaces
import { IAuthService } from '../../data/interfaces/IServices/authService.interface';
import { IEmailService } from '../../data/interfaces/IServices/emailService.interface';
import { IParkingService } from '../../data/interfaces/IServices/parkingService.interface';
import { IRuleService } from '../../data/interfaces/IServices/ruleService.interface';
import { ILogService } from '../../data/interfaces/IServices/logService.interface';
import { IParkingAddressService } from '../../data/interfaces/IServices/parking-addressService.interface';
import { IParkingFileService } from '../../data/interfaces/IServices/parking-fileService.interface';
import { ICompanyService } from '../../data/interfaces/IServices/companyService.interface';
import { IEmployeeService } from '../../data/interfaces/IServices/employeeService.interface';
import { ICompanyAddressService } from '../../data/interfaces/IServices/company-addressService.interface';
import { IParkingSpaceService } from '../../data/interfaces/IServices/parking-spaceService.interface';
import { IParkingFinanceService } from '../../data/interfaces/IServices/parking-financeService.interface';
import { ISchedulingService } from '../../data/interfaces/IServices/schedulingService.interface';
import { IParkingScoreService } from '../../data/interfaces/IServices/parking-scoreService.interface';
import { ICardService } from '../../data/interfaces/IServices/cardService.interface';
import { IUserAddressService } from '../../data/interfaces/IServices/user-addressService.interface';
import { IUserService } from '../../data/interfaces/IServices/userService.interface';
import { IVehicleService } from '../../data/interfaces/IServices/vehicleService.interface';
import { IRouteSecurityService } from '../../data/interfaces/IServices/route-securityService.interface';
import { IFavoriteParkingService } from '../../data/interfaces/IServices/favorite-parkingService.interface';
import { IParkingProductService } from '../../data/interfaces/IServices/parking-productService.interface';
import { ISchedulingProductService } from '../../data/interfaces/IServices/scheduling-productService.interface';
import { IParkingPriceService } from '../../data/interfaces/IServices/parking-priceService.interface';

// Binds
const container = new Container();

// Services Binds
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IEmailService>(TYPES.IEmailService).to(EmailService);
container.bind<IParkingService>(TYPES.IParkingService).to(ParkingService);
container.bind<ICompanyService>(TYPES.ICompanyService).to(CompanyService);
container.bind<ICompanyAddressService>(TYPES.ICompanyAddressService).to(CompanyAddressService);
container.bind<IParkingAddressService>(TYPES.IParkingAddressService).to(ParkingAddressService);
container.bind<IUserAddressService>(TYPES.IUserAddressService).to(UserAddressService);
container.bind<IRuleService>(TYPES.IRuleService).to(RuleService);
container.bind<ILogService>(TYPES.ILogService).to(LogService);
container.bind<IParkingFileService>(TYPES.IParkingFileService).to(ParkingFileService);
container.bind<IEmployeeService>(TYPES.IEmployeeService).to(EmployeeService);
container.bind<IParkingSpaceService>(TYPES.IParkingSpaceService).to(ParkingSpaceService);
container.bind<ISchedulingService>(TYPES.ISchedulingService).to(SchedulingService);
container.bind<IParkingScoreService>(TYPES.IParkingScoreService).to(ParkingScoreService);
container.bind<ICardService>(TYPES.ICardService).to(CardService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IVehicleService>(TYPES.IVehicleService).to(VehicleService);
container.bind<IRouteSecurityService>(TYPES.IRouteSecurityService).to(RouteSecurityService);
container.bind<IFavoriteParkingService>(TYPES.IFavoriteParkingService).to(FavoriteParkingService);
container.bind<IParkingProductService>(TYPES.IParkingProductService).to(ParkingProductService);
container.bind<ISchedulingProductService>(TYPES.ISchedulingProductService).to(SchedulingProductService);
container.bind<IParkingFinanceService>(TYPES.IParkingFinanceService).to(ParkingFinanceService);
container.bind<IParkingPriceService>(TYPES.IParkingPriceService).to(ParkingPriceService);


// Repositories Binds
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IUserAddressRepository>(TYPES.IUserAddressRepository).to(UserAddressRepository);
container.bind<ICardRepository>(TYPES.ICardRepository).to(CardRepository);
container.bind<ICompanyRepository>(TYPES.ICompanyRepository).to(CompanyRepository);
container.bind<ICompanyAddressRepository>(TYPES.ICompanyAddressRepository).to(CompanyAddressRepository);
container.bind<IEmployeeRepository>(TYPES.IEmployeeRepository).to(EmployeeRepository);
container.bind<IVehicleRepository>(TYPES.IVehicleRepository).to(VehicleRepository);
container.bind<IParkingRepository>(TYPES.IParkingRepository).to(ParkingRepository);
container.bind<IRuleRepository>(TYPES.IRuleRepository).to(RuleRepository);
container.bind<IParkingSpaceRepository>(TYPES.IParkingSpaceRepository).to(ParkingSpaceRepository);
container.bind<IParkingAddressRepository>(TYPES.IParkingAddressRepository).to(ParkingAddressRepository);
container.bind<ISchedulingRepository>(TYPES.ISchedulingRepository).to(SchedulingRepository);
container.bind<IParkingScoreRepository>(TYPES.IParkingScoreRepository).to(ParkingScoreRepository);
container.bind<IParkingFinanceRepository>(TYPES.IParkingFinanceRepository).to(ParkingFinanceRepository);
container.bind<ILogRepository>(TYPES.ILogRepository).to(LogRepository);
container.bind<IParkingFileRepository>(TYPES.IParkingFileRepository).to(ParkingFileRepository);
container.bind<IRouteSecurityRepository>(TYPES.IRouteSecurityRepository).to(RouteSecurityRepository);
container.bind<IFavoriteParkingRepository>(TYPES.IFavoriteParkingRepository).to(FavoriteParkingRepository);
container.bind<IParkingProductRepository>(TYPES.IParkingProductRepository).to(ParkingProductRepository);
container.bind<ISchedulingProductRepository>(TYPES.ISchedulingProductRepository).to(SchedulingProductRepository);
container.bind<IParkingPriceRepository>(TYPES.IParkingPriceRepository).to(ParkingPriceRepository);

export { container };