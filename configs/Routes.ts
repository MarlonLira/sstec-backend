import * as express from 'express';

module.exports = function(server) {
   
    //API Routes
    const router = express.Router();
    server.use('/api', router);
    
    const clientController = require ('../controllers/ClientController');
}