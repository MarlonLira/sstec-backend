import ParkingPromotion from '../../models/parkingPromotion';

/**
 * @description
 * @author Felipe Seabra
 * @interface IParkingPromotionRepository
 */
interface IParkingPromotionRepository {
  Save(parkingPromotion: ParkingPromotion, parkingId: number);
  Update(parkingPromotion: ParkingPromotion);
  ToList();
  GetByName(name: string);
  Delete(id: number);
}

export default IParkingPromotionRepository;