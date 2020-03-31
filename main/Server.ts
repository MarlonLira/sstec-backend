import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import "reflect-metadata";
import { InversifyExpressServer } from 'inversify-express-utils';

dotenv.config();
const allowCors = require('./Cors');
const port = process.env.PORT || 4001;
const swaggerUi = require('swagger-ui-express');

import * as swaggerDocument from '../swagger.json';
import container from '../inversify.config';

// declare metadata by @controller annotation
import '../data/controllers/userController';
import '../data/controllers/authController';

let app = new InversifyExpressServer(container);
app.setConfig((server) => {
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(allowCors);
  server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});

let server = app.build();

if (!process.env.SECRET) {
  console.log('Did not find the environment variables!');
} else {
  console.log('Environment variables loaded!');
}

server.listen(port, function () {
  console.log(`BACKEND is running on port ${port}.`)
});

module.exports = server;