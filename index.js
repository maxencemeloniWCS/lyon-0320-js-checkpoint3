require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { log, logInfos, routeResponse } = require('./libs/utils');
const sql = require('./db.js');

const app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use(logInfos);

// **********************BASIC SHITS***********************

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to this shitty application.',
	});
});

// INSERT INTO

app.get('/playlist', (req, res) => {
	sql.query('SELECT * FROM playlist', (err, results) => {
		routeResponse(res, err, results);
	});
});

//SELECT ALL

app.get('/track', (req, res) => {
	sql.query('SELECT * FROM track', (err, results) => {
		routeResponse(res, err, results);
	});
});

app.get('/playlist', (req, res) => {
	sql.query('SELECT * FROM playlist', (err, results) => {
		routeResponse(res, err, results);
	});
});

//SELECT id
app.get('/track/:id', (req, res) => {
	sql.query(
		'SELECT * FROM track WHERE id=?',
		[req.params.id],
		(err, results) => {
			routeResponse(res, err, results);
		}
	);
});

app.get('/playlist/:id', (req, res) => {
	sql.query(
		'SELECT * FROM playlist WHERE id=?',
		[req.params.id],
		(err, results) => {
			routeResponse(res, err, results);
		}
	);
});

app.listen(process.env.PORT, (err) => {
	if (err) {
		throw new Error('Something bad happened...');
	}

	log(`Server is listening on ${process.env.PORT}`);
});
