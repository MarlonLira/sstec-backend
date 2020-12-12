import * as express from "express";

import { Container } from "inversify";
import { Attributes } from "../../commons/core/attributes";
import { Http } from "../../commons/core/http";
import TYPES from '../../data/types';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { AuthService } from "../../data/services/auth.service";
import { container } from "../inversify/inversify.config";

function safetyMiddlewareFactory(container: Container) {
  return () => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const authService = container.get<AuthService>(TYPES.IAuthService);
      (async () => {
        const token = req.headers["authorization"] || req.body.token || req.params.token;
        if (Attributes.isValid(token)) {
          let access: any = await authService.checkToken(token);

          if (access?.valid) {
            next();
          } else {
            Http.SendErrorMessage(res, HttpMessage.Request_Unauthorized, 'Safety')
          }

        } else {
          Http.SendErrorMessage(res, HttpMessage.Request_Forbidden, 'Safety')
        }

      })();
    };
  };
}

const safetyMiddleware = safetyMiddlewareFactory(container);

export { safetyMiddleware };