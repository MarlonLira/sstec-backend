import { interfaces } from "inversify-express-utils";
import { Response, Request } from "express";

/**
 * @description
 * @author Emerson Souza
 * @interface IParkingController
 * @extends {interfaces.Controller}
 */
interface IParkingController extends interfaces.Controller {
  Save(req: Request<any>, res: Response<any>): Promise<any>;
  Search(req: Request<any>, res: Response<any>): Promise<any>;
  SearchAll(req: Request<any>, res: Response<any>): Promise<any>;
  Update(req: Request<any>, res: Response<any>): Promise<any>;
  Delete(req: Request<any>, res: Response<any>): Promise<any>;
}

export default IParkingController;