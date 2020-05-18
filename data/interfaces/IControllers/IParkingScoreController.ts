import { interfaces } from "inversify-express-utils";
import { Response, Request } from "express";

/**
 * @description
 * @author Emerson Souza
 * @interface IParkingScoreController
 * @extends {interfaces.Controller}
 */
interface IParkingScoreController extends interfaces.Controller {
  Save(req: Request<any>, res: Response<any>): Promise<any>;
  Search(req: Request<any>, res: Response<any>): Promise<any>;
  SearchAll(req: Request<any>, res: Response<any>): Promise<any>;
  Update(req: Request<any>, res: Response<any>): Promise<any>;
  Delete(req: Request<any>, res: Response<any>): Promise<any>;
}

export default IParkingScoreController;