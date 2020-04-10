import { interfaces } from "inversify-express-utils";
import { Response, Request } from "express";

/**
 * @description
 * @author Marlon Lira
 * @interface IAuthController
 * @extends {interfaces.Controller}
 */
interface IAuthController extends interfaces.Controller {
  TokenValidate(req: Request<any>, res: Response<any>)
  SignIn(req: Request<any>, res: Response<any>)
  SignUp(req: Request<any>, res: Response<any>)
}

export default IAuthController;