import { RouteSecurity } from "../../models/route-security.model";

export interface IRouteSecurityService {
  save(routeSecurity: RouteSecurity): Promise<any>;
  update(routeSecurity: RouteSecurity): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<RouteSecurity>;
  getByName(name: string): Promise<RouteSecurity[]>;
  toList(): Promise<RouteSecurity[]>;
}