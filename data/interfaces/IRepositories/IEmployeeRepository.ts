import Employee from '../../models/employee';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IEmployeeRepository
 */
interface IEmployeeRepository {
  GetByName(employeeName: string);
  GetByRegistryCode(registryCode: string);
  ToList();
  Save(employee : Employee);
  Find(employee: Employee, properties: string[]);
}

export default IEmployeeRepository;