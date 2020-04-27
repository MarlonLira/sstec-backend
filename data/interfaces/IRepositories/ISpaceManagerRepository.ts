import SpaceManager from '../../models/spaceManager';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ISpaceManagerRepository
 */
interface ISpaceManagerRepository {
  Save(spaceManager: SpaceManager): Promise<any>;
  GetById(id: number): Promise<SpaceManager>;
  GetByParkingSpaceId(parkingSpaceId: number): Promise<SpaceManager[]>;
  Delete(_id: number): Promise<any>;
  Update(spaceManager: SpaceManager): Promise<any>;
}

export default ISpaceManagerRepository;