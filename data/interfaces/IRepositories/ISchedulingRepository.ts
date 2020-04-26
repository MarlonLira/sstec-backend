import Scheduling from '../../models/scheduling';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ISchedulingRepository
 */
interface ISchedulingRepository {
  Save(scheduling: Scheduling): Promise<any>;
  GetById(id: number): Promise<Scheduling>;
  GetByUserId(userId: number): Promise<Scheduling[]>;
  Delete(_id: number): Promise<any>;
  Update(scheduling: Scheduling): Promise<any>;
}

export default ISchedulingRepository;