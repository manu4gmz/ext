const functions = require('firebase-functions');
const express = require('express');
const routes = require('./routes');
const api = require('./api');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors())

//coonfigurando parseo
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/public", express.static(__dirname + '/public'));

app.use('/api', api);
app.use('/', routes);

app.get('/api/timestamp', (req, res) => {
	res.send(`${Date.now()}`);
})

//middleware error
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send(err.stack)
})


exports.app = functions.https.onRequest(app);
