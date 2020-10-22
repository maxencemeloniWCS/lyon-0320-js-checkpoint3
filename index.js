require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { log, logInfos } = require('./libs/utils');
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

//SELECT ALL

app.get('/prout', (req, res) => {
	sql.query('SELECT * FROM users', (err, results) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving data');
		} else {
			res.status(200).json(results);
		}
	});
});

//SELECT id
app.get('/prout/:id', (req, res) => {
	sql.query(
		'SELECT * FROM * WHERE user_id=?',
		[req.params.id],
		(err, results) => {
			if (err) {
				console.log(err);
				res.status(500).send('Error retrieving data');
			} else {
				res.status(200).json(results);
			}
		}
	);
});

app.listen(process.env.PORT, (err) => {
	if (err) {
		throw new Error('Something bad happened...');
	}

	log(`Server is listening on ${process.env.PORT}`);
});
