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
val.id = 2;
val.firstName = "Marlon";
val.lastName = "Lira";
val.phone = "81986803427";
var val2 = null;
//new Client().Save(val);
var cl = new Client();

//cl.Search(val).then(x => console.log(x))
cl.Update(val).then(x => console.log(x));

 //((value) => new Client().Search(val).then(() => console.log(value)))

// val.firstName = "Marlon";
//
//new Client().Delete(val);

