import { interfaces } from "inversify-express-utils";
import { Response, Request } from "express";

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ISpaceManagerController
 * @extends {interfaces.Controller}
 */

interface ISpaceManagerController extends interfaces.Controller {
  Save(req: Request<any>, res: Response<any>);
  Search(req: Request<any>, res: Response<any>);
  Update(req: Request<any>, res: Response<any>);
  Delete(req: Request<any>, res: Response<any>);
}

export default ISpaceManagerController;