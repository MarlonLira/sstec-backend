import "reflect-metadata";

import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

import * as swaggerDocument from '../middleware/swagger/swagger.json';
import container from '../middleware/inversify/inversify.config';
require('../middleware/inversify/metadata');

import Logger from '../commons/logger';

class Server {
  public inversifyExpress: InversifyExpressServer;
  public express: express.Application;

  public constructor() {
    this.inversifyExpress = new InversifyExpressServer(container);
    this.Middlewares();
    this.Status();
  }

  private Middlewares(): void {
    dotenv.config();
    const allowCors = require('./Cors');
    const swaggerUi = require('swagger-ui-express');

    this.inversifyExpress.setConfig((server) => {
      server.use(bodyParser.urlencoded({ extended: true }));
      server.use(bodyParser.json());
      server.use(allowCors);
      server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    });

    this.express = this.inversifyExpress.build();
  }

  private Status() {
    const port = process.env.PORT || 4001;

    if (!process.env.SECRET) {
      Logger.Error(this, 'Did not find the environment variables!');
    } else {
      Logger.Info(this, 'Environment variables loaded!');
    }

    this.express.listen(port, function () {
      Logger.Info(this, `BACKEND is running on port ${port}.`);
    });
  }
}

export default new Server().express;