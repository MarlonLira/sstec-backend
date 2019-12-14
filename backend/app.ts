// src/index.ts

import * as express from 'express';
import { DbConnect} from './db';
//import * as cors from 'cors'
//import * as bodyParser from 'body-parser'

const app = express()
const port = 4001

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())

app.get('/', (req, res, next) => {
    res.json('Hello world')
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

var a = new DbConnect('sstec', 'root', '123456', 'localhost');

