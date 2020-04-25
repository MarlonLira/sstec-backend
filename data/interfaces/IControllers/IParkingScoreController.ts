import { interfaces } from "inversify-express-utils";
import { Response, Request } from "express";

/**
 * @description
 * @author Emerson Souza
 * @interface IParkingScoreController
 * @extends {interfaces.Controller}
 */
interface IParkingScoreController extends interfaces.Controller {
  Save(req: Request<any>, res: Response<any>);
  Search(req: Request<any>, res: Response<any>);
  Update(req: Request<any>, res: Response<any>);
  Delete(req: Request<any>, res: Response<any>);
}

export default IParkingScoreController;