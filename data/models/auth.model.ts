import { User } from './user.model';
import { Employee } from './employee.model';
import { Attributes } from '../../commons/core/attributes';
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
    if (json) {
      this.token = Attributes.returnIfValid(json.token);
      this.authenticationLevel = Attributes.returnIfValid(json.authenticationLevel);
      this.validated = Attributes.returnIfValid(json.validated);
      this.user = Attributes.isValid(json.user) ? new User(json.user) : undefined;
      this.employee = Attributes.isValid(json.employee) ? new Employee(json.employee) : undefined;
      this.company = Attributes.isValid(json.company) ? new Company(json.company) : undefined;
      this.parking = Attributes.isValid(json.parking) ? new Parking(json.parking) : undefined;
      this.routeSecurity = Attributes.isValid(json.routeSecurity) ? json.routeSecurity : undefined;
    }
  }
}