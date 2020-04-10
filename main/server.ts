import 'reflect-metadata';
import '../middleware/inversify/metadata';

import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

import * as swaggerDocument from '../middleware/swagger/swagger.json';
import container from '../middleware/inversify/inversify.config';

import Logger from '../commons/core/logger';
import Database from '../data/database';

/**
 * @description
 * @author Marlon Lira
 * @class Server
 */
class Server {

  /**
   * @description
   * @type {InversifyExpressServer}
   * @memberof Server
   */
  public inversifyExpress: InversifyExpressServer;

  /**
   * @description
   * @type {express.Application}
   * @memberof Server
   */
  public express: express.Application;

  /**
   *Creates an instance of Server.
   * @author Marlon Lira
   * @memberof Server
   */
  public constructor() {
    this.inversifyExpress = new InversifyExpressServer(container);
    this.Middlewares()
      .then(() => this.Status()
        .then(() => this.Database()));
  }

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @memberof Server
   */
  private Middlewares() {
    return new Promise((resolve) => {
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
      resolve();
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @memberof Server
   */
  private Database() {
    new Database().Build();
  }

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @memberof Server
   */
  private Status() {
    const port = process.env.PORT || 4001;
    return new Promise((resolve) => {
      if (!process.env.SECRET) {
        Logger.Error(this, 'Did not find the environment variables!');
      } else {
        Logger.Info(this, 'Environment variables loaded!');
      }

      this.express.listen(port, function () {
        Logger.Info(this, `Backend is running on port ${port}.`);
        resolve();
      });
    })

  }
}

export default new Server().express;