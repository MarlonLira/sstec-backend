// src/index.ts
import * as express from 'express';
import { Client, ClientMdl } from './Models/Client';

//import * as cors from 'cors'
//import * as bodyParser from 'body-parser'

const app = express()
const port = 4001

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())

//Exemplo de Rota
app.get('/', (req, res, next) => {
	res.json('Hello world');
})

app.listen(port, () => {
	console.log(`App is listening on port ${port}`)
})

// Exemplo de modificação de entidade
var val = new ClientMdl();
val.firstName = "Marlon";
val.lastName = "Lira";
val.phone = "81999003499";
val.registryCode = "0927756789";
var val2 = null;
//new Client().Save(val);
var cl = new Client();
cl.Save(val).then(x => console.log(x));
//cl.Search(val).then(x => console.log(x));
//cl.Update(val).then(x => console.log(x));
//cl.Delete(val).then(x => console.log(x));

 //((value) => new Client().Search(val).then(() => console.log(value)))

// val.firstName = "Marlon";
//
//new Client().Delete(val);

