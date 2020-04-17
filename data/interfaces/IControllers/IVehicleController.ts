import { interfaces } from "inversify-express-utils";
import { Response, Request } from "express";

/**
 * @description
 * @author Marlon Lira
 * @interface IVehicleController
 * @extends {interfaces.Controller}
 */
interface IVehicleController extends interfaces.Controller {
  Save(req: Request<any>, res: Response<any>): Promise<any>;
  Search(req: Request<any>, res: Response<any>): Promise<any>;
  SearchAll(req: Request<any>, res: Response<any>): Promise<any>;
  Update(req: Request<any>, res: Response<any>): Promise<any>;
  Delete(req: Request<any>, res: Response<any>): Promise<any>;
}

export default IVehicleController;