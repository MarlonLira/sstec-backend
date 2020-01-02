import * as express from 'express';
import ClientController from '../controllers/ClientController';

module.exports = function(server) {
    Register(server, '/client', ClientController);
}

function Register(server, path, controller : any) {
    const router = express.Router();
    server.use(path, router);
  
    router.post('/create', (req, res) => {
        console.log(req.body)
		new controller(req.body).Save(res).then(x => console.log(x.dataValues));
    });
    router.get('/search', (req, res) => {
        new controller(req.body).Search(res).then(x => console.log(x.dataValues));
    });
    router.put('/update', (req, res) => {
        new controller(req.body).Update(res).then(x => console.log(x.dataValues));
    });
    router.delete('/delete', (req, res) => {
        new controller(req.body).Delete(res).then(x => console.log(x.dataValues));
    });
  }