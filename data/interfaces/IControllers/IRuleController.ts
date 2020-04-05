import { interfaces } from "inversify-express-utils";
import { Response, Request } from "express";

interface IRuleController extends interfaces.Controller {
  Save(req: Request<any>, res: Response<any>)
  Search(req: Request<any>, res: Response<any>)
  SearchAll(req: Request<any>, res: Response<any>)
  Update(req: Request<any>, res: Response<any>)
  Delete(req: Request<any>, res: Response<any>)
}

export default IRuleController;