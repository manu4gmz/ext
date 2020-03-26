const functions = require('firebase-functions');
const express = require('express');
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())

//coonfigurando parseo
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)
app.get('/', (req, res) => res.send('App On'))

app.get('/api/timestamp', (req, res) => {
	res.send(`${Date.now()}`);
})

//middleware error
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})


exports.app = functions.https.onRequest(app);
