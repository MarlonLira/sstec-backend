import 'reflect-metadata';
import '../middleware/inversify/metadata';

import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

import { container } from '../middleware/inversify/inversify.config';
import * as helmet from 'helmet';

import { Logger } from '../commons/core/logger';
import { Database } from '../data/database';

import * as io from "socket.io";

declare global {
  namespace NodeJS {
    interface Global {
      SocketServer: io.Server
    }
  }
}

class Server {

  public inversifyExpress: InversifyExpressServer;

  public express: express.Application;

  public constructor() {
    this.inversifyExpress = new InversifyExpressServer(container);
    this.middlewares()
      .then(() => this.status()
        .then(() => this.database()));
  }

  private middlewares() {
    return new Promise((resolve, reject) => {
      try {
        dotenv.config();
        const allowCors = require('./cors');

        this.inversifyExpress.setConfig((server) => {
          server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
          server.use(bodyParser.json({ limit: '50mb' }));
          server.use(allowCors);
          server.use(helmet());
        });

        this.express = this.inversifyExpress.build();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private database() {
    new Database().Build();
  }

  public status() {
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