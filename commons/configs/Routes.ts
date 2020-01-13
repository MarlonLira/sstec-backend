import * as express from 'express';
import ClientController from '../../controllers/ClientController';
import EmployeeController from '../../controllers/EmployeeController';

module.exports = function(server) {
    Register(server, 'client', ClientController);
    Register(server, 'employee', EmployeeController);
}

function Register(server, path, controller : any) {
    const router = express.Router();
    server.use('/', router);
  
    router.post('/' + path, (req, res) => {
		new controller(req.body).Save(res).then(x => console.log());
    });
    router.get('/' + path, (req, res) => {
        new controller(req.body).Search(res).then(x => console.log());
    });
    router.get('/' + path + 's', (req, res) => {
        new controller(req.body).SearchAll(res).then(x => console.log());
    });
    router.put('/' + path, (req, res) => {
        new controller(req.body).Update(res).then(x => console.log());
    });
    router.delete('/' + path, (req, res) => {
        new controller(req.body).Delete(res).then(x => console.log());
    });
  }