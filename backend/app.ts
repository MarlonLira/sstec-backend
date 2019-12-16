// src/index.ts

import * as express from 'express';
import * as DbConnect from './db';
import * as Client from './Models/Client';

//import * as cors from 'cors'
//import * as bodyParser from 'body-parser'

const app = express()
const port = 4001

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())

app.get('/', (req, res, next) => {
    res.json('Hello world');
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

//var a = new DbConnect('sstec', 'root', '123456', 'localhost');

//var a = new DbConnect.default('sstec', 'sa', 'Root1526', './sqlexpress');
var a = new DbConnect.default('d8crqilshjdjcp', 'nlftzsubppeyav', '259cf8d446022dc1743ab5ee5727a7e969d6b6e38e8826dddb5c1c0a09dae068', 'ec2-107-21-110-75.compute-1.amazonaws.com');

var sq = a.getInstance();

sq.sync()
  .then(() => Client.default.create({
    firstName: 'janedoe',
    lastName: 'janedoe',
    phone: '81986465525'
  }))
  .then(j => {
    console.log(j.toJSON());
  });