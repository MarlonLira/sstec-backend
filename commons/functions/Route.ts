import * as express from 'express';
import IAuthSecurity from '../../interfaces/IAuthSecurity';

class Route {
  static Register(server, controller: any) {
    const router = express.Router();
    server.use('/', router);

    let path = controller.name.replace('Controller', '');
    router.post(`/${path}`, (req, res) => {
      new controller(req.body).Save(res).then(x => console.log());
    });
    router.get(`/${path}/:id`, (req, res) => {
      req.body = req.params;
      console.log(req.body);
      new controller(req.body).Search(res).then(x => console.log());
    });
    router.get(`/${path}s`, (req, res) => {
      console.log(req.body);
      new controller(req.body).Search(res, true).then(x => console.log());
    });
    router.put(`/${path}`, (req, res) => {
      new controller(req.body).Update(res).then(x => console.log());
    });
    router.delete(`/${path}/:id`, (req, res) => {
      req.body.id = req.params.id;
      new controller(req.body).Delete(res).then(x => console.log());
    });
  }
}

class RouteAuth {
  static Register(server, controller: any) {
    const router = express.Router();
    server.use('/', router);

    let path = controller.name.replace('Controller', '');
    router.post(`/${path}/tokenValidate`, (req, res) => {
      new controller(req.body).TokenValidate(res).then(x => console.log());
    });

    router.post(`/${path}/tokenGeneration`, (req, res) => {
      new controller(req.body).TokenGeneration(res).then(x => console.log());
    });

    router.post(`/${path}/signin`, (req, res) => {
      new controller(req.body).SignIn(res).then(x => console.log());
    });

    router.post(`/${path}/signup`, (req, res) => {
      new controller(req.body).SignUp(res).then(x => console.log());
    });
  }
}

export { Route, RouteAuth };