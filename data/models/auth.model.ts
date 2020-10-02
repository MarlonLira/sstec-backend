import { User } from './user.model';
import { Employee } from './employee.model';
import Attributes from '../../commons/core/attributes';
import { Company } from './company.model';
import { Parking } from './parking.model';
import { RouteSecurity } from './route-security.model';

export class Auth {

  token!: string;
  validated!: boolean;
  user!: User;
  employee!: Employee;
  company!: Company;
  parking!: Parking;
  routeSecurity!: RouteSecurity[];
  authenticationLevel!: number;

  constructor(json?: any) {
    this.token = Attributes.ReturnIfValid(json.token);
    this.authenticationLevel = Attributes.ReturnIfValid(json.authenticationLevel);
    this.validated = Attributes.ReturnIfValid(json.validated);
    this.user = Attributes.IsValid(json.user) ? new User(json.user) : undefined;
    this.employee = Attributes.IsValid(json.employee) ? new Employee(json.employee) : undefined;
    this.company = Attributes.IsValid(json.company) ? new Company(json.company) : undefined;
    this.parking = Attributes.IsValid(json.parking) ? new Parking(json.parking) : undefined;
    this.routeSecurity = Attributes.IsValid(json.routeSecurity) ? json.routeSecurity : undefined;
  }
}