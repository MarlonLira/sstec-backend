// src/index.ts

import * as express from 'express';
import * as Db from './db';
import { Client, ClientMdl } from './Models/Client';

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

var val = new ClientMdl();
val.firstName = "Marlon";
val.lastName = "Lira",
val.phone = "81986803427";

//new Client().Save(val);
var val2 = new Client().Search(val);
// val.firstName = "Marlon";
//new Client().update(val);
//new Client().Delete(val);
console.log(val2)
