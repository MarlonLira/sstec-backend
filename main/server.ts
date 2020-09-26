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

import * as io from "socket.io";

declare global {
  namespace NodeJS {
    interface Global {
      SocketServer: io.Server
    }
  }
}

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
   * Creates an instance of Server.
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
    return new Promise((resolve, reject) => {
      try {
        dotenv.config();
        const allowCors = require('./cors');
        const swaggerUi = require('swagger-ui-express');

        this.inversifyExpress.setConfig((server) => {
          server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
          server.use(bodyParser.json({limit: '50mb'}));
          server.use(allowCors);
          server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        });

        this.express = this.inversifyExpress.build();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
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
  public Status() {
    const port = process.env.PORT || 4001;

    return new Promise((resolve) => {
      if (!process.env.SECRET) {
        Logger.Error(this, 'Did not find the environment variables!');
      } else {
        Logger.Info(this, 'Environment variables loaded!');
      }
      const server = this.express.listen(port, function () {
        Logger.Info(this, `Backend is running on port ${port}.`);
        resolve();
      });

      global.SocketServer = io(server);
      global.SocketServer.on('connection', soket => {
        Logger.Warn(this, 'Socket [IO] - Connected!');
      });
    });
  }
}

export default new Server().express;