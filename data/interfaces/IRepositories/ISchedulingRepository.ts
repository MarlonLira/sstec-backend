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

  /**
   * @description
   * @author Marlon Lira
   * @param {Scheduling} scheduling
   * @returns {Promise<Scheduling[]>}
   * @memberof ISchedulingRepository
   */
  ReturnIfExists(scheduling: Scheduling): Promise<Scheduling[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} parkingId
   * @returns {Promise<Scheduling[]>}
   * @memberof ISchedulingRepository
   */
  ToList(_parkingId: number): Promise<Scheduling[]>;

  Delete(_id: number): Promise<any>;
  Update(scheduling: Scheduling): Promise<any>;
}

export default ISchedulingRepository;