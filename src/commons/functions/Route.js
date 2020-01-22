"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Route {
    static Register(server, controller) {
        const router = express.Router();
        server.use('/', router);
        let path = controller.name.replace('Controller', '');
        router.post(`/${path}`, (req, res) => {
            new controller(req.body).Save(res).then(x => console.log());
        });
        router.get(`/${path}/:id`, (req, res) => {
            req.body.id = req.params.id;
            new controller(req.body).Search(res).then(x => console.log());
        });
        router.get(`/${path}s`, (req, res) => {
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
exports.Route = Route;
//# sourceMappingURL=Route.js.map