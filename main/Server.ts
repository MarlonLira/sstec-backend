import * as dotenv from 'dotenv';

const jwt = require('jsonwebtoken');
import * as express from 'express';
import * as bodyParser from 'body-parser';

dotenv.config();
const server = express();
const allowCors = require('./Cors');
const port = process.env.PORT || 4001;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);

if (!process.env.SECRET) {
 console.log('Did not find the environment variables!');
}else{
  console.log('Environment variables loaded!');
}

server.listen(port, function () {
  console.log(`BACKEND is running on port ${port}.`)
});

module.exports = server;