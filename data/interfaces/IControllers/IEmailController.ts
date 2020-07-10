import { interfaces } from "inversify-express-utils";
import { Response, Request } from "express";

/**
 * @description
 * @author Marlon Lira
 * @interface IAuthController
 * @extends {interfaces.Controller}
 */
interface IEmailController extends interfaces.Controller {
  Send(req: Request<any>, res: Response<any>);
}

export default IEmailController;