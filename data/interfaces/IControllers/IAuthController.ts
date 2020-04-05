import { interfaces } from "inversify-express-utils";
import { Response, Request } from "express";

interface IAuthController extends interfaces.Controller {
  TokenValidate(req: Request<any>, res: Response<any>)
  TokenGeneration(req: Request<any>, res: Response<any>)
  SignIn(req: Request<any>, res: Response<any>)
  SignUp(req: Request<any>, res: Response<any>)
}

export default IAuthController;