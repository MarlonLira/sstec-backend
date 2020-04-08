import Vehicle from '../../models/vehicle';

interface IVehicleRepository {
  Save(vehicle : Vehicle);
  Find(vehicle: Vehicle, properties: string[]);
}

export default IVehicleRepository;