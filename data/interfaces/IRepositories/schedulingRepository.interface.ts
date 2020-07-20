import Scheduling from '../../models/scheduling.model';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ISchedulingRepository
 */
interface ISchedulingRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {Scheduling} scheduling
   * @returns {Promise<any>}
   * @memberof ISchedulingRepository
   */
  Save(scheduling: Scheduling): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<Scheduling>}
   * @memberof ISchedulingRepository
   */
  GetById(id: number): Promise<Scheduling>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} userId
   * @returns {Promise<Scheduling[]>}
   * @memberof ISchedulingRepository
   */
  GetByUserId(userId: number): Promise<Scheduling[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _parkingId
   * @returns {Promise<Scheduling[]>}
   * @memberof ISchedulingRepository
   */
  GetByParkingId(_parkingId: number): Promise<Scheduling[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _companyId
   * @returns {Promise<Scheduling[]>}
   * @memberof ISchedulingRepository
   */
  GetByCompanyId(_companyId: number): Promise<Scheduling[]>;

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
   * @param {number} _id
   * @returns {Promise<any>}
   * @memberof ISchedulingRepository
   */
  Delete(_id: number): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Scheduling} scheduling
   * @returns {Promise<any>}
   * @memberof ISchedulingRepository
   */
  Update(scheduling: Scheduling): Promise<any>;
}

export default ISchedulingRepository;