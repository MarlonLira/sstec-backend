// src/index.ts
import * as express from 'express';
import { Client } from './Models/Client';

import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { Json } from 'sequelize/types/lib/utils';

const app = express()
const port = 4001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//Exemplo de Rota
// app.get('/Client', (req, res, next) => {
// 	res.json('Request of Get');
// })

// app.post('/Client', (req, res, next) => {
// 	res.json('Request of Post');
// 	console.log()
// })

app.route('/Client')
	.get((req, res, next) => {

		new Client().Save(new Client({
			firstName: req.params.firstName,
			lastName: req.params.lastName,
			registryCode: req.params.registryCode,
			phone: req.params.phone
		})
		).then(x => {
			res.json('Request of Get: ' + x);
		});

		console.log(req.params);
	})
	.post((req, res) => {
		Client.findOne({
			where: {
				firstName: req.body.firstName,
				lastName: req.body.lastName
			}
		}).then(result => {
			if (result != undefined && result != null) {
				res.status(400).send({
					code: 400,
					message: 'Usuário já cadastrado'
				})
			} else {
				Client.scope('public').create({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					registryCode: req.body.registryCode,
					phone: req.body.phone
				}).then(result => {
					res.status(200).send(result)
				}).catch(error => {
					console.error(error)
					res.status(500).send({
						code: 500,
						message: 'internal error'
					})
				})
			}
		})
	})
	.put((req, res, next) => {
		res.json('Request of put: ' + req.params.id + req.params.firstName + ' ' + req.params.lastName);
		console.log(req.params);
	})
	.delete((req, res, next) => {
		res.json('Request of delete: ' + req.params.id);
		console.log(req.params);
	})


app.listen(port, () => {
	console.log(`App is listening on port ${port}`)
})

// Exemplo de modificação de entidade
// var val = new ClientMdl();
// val.firstName = "Marlon";
// val.lastName = "Lira";
// val.phone = "81999003499";
// val.registryCode = "0927756789";
// var val2 = null;
// //new Client().Save(val);
// var cl = new Client();
//cl.Save(val).then(x => console.log(x));
//cl.Search(val).then(x => console.log(x));
//cl.Update(val).then(x => console.log(x));
//cl.Delete(val).then(x => console.log(x));

 //((value) => new Client().Search(val).then(() => console.log(value)))

// val.firstName = "Marlon";
//
//new Client().Delete(val);

//obs: corrigir -> Views -> Routes -> Controllers -> Views 
