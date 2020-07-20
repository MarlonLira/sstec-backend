const TYPES = {
  // Services Types
  IAuthService: Symbol('IAuthService'),
  IEmailService: Symbol('IEmailService'),
  IParkingService: Symbol('IParkingService'),
  IRuleService: Symbol('IRuleService'),
  ILogService: Symbol('ILogService'),

  // Repositories Types
  IUserRepository: Symbol('IUserRepository'),
  ICardRepository: Symbol('ICardRepository'),
  ICompanyRepository: Symbol('ICompanyRepository'),
  ICompanyAdressRepository: Symbol('ICompanyAdressRepository'),
  IEmployeeRepository: Symbol('IEmployeeRepository'),
  IPaymentRepository: Symbol('IPaymentRepository'),
  IVehicleRepository: Symbol('IVehicleRepository'),
  IParkingRepository: Symbol('IParkingeRepository'),
  IRuleRepository: Symbol('IRuleRepository'),
  IParkingPromotionRepository: Symbol('IParkingPromotionRepository'),
  IParkingSpaceRepository: Symbol('IParkingSpaceRepository'),
  IParkingScoreRepository: Symbol('IParkingScoreRepository'),
  IParkingAdressRepository: Symbol('IParkingAdressRepository'),
  IUserAdressRepository: Symbol('IUserAdressRepository'),
  ISchedulingRepository: Symbol('ISchedulingRepository'),
  IParkingFinanceRepository: Symbol('IParkingFinanceRepository'),
  ILogRepository: Symbol('ILogRepository'),
};

export default TYPES;