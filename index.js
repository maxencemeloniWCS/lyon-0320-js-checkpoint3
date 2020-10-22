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

// ALL TRACKS FROM PLAYLIST

app.get('/playlist/:id/alltracks', (req, res) => {
	sql.query(
		'SELECT  `playlist_id`, `title`, `artist`, `album_picture`, `youtube_url` FROM track WHERE playlist_id=?',
		[req.params.id],
		(err, results) => {
			routeResponse(res, err, results);
		}
	);
});

// DELETE

app.delete('/track/:id', (req, res) => {
	sql.query('DELETE FROM track WHERE id=?', [req.params.id], (err, results) => {
		routeResponse(res, err, results);
	});
});

app.delete('/playlist/:id', (req, res) => {
	sql.query(
		'DELETE FROM playlist WHERE id=?',
		[req.params.id],
		(err, results) => {
			routeResponse(res, err, results);
		}
	);
});

// UPDATE

app.put('/playlist/:id', (req, res) => {
	if (!req.body.title || !req.body.genre) {
		res.status(412).send({
			message:
				'Please, send request with valid body : {title : titre, genre: genre}',
		});
	} else {
		const playlist = JSON.parse(JSON.stringify(req.body));
		sql.query(
			`UPDATE playlist SET ? where id=${req.params.id}`,
			playlist,
			(err1, results1) => {
				if (err1) {
					console.trace(err1);
					res.status(500).send(err1);
				} else {
					sql.query(
						'SELECT * FROM playlist WHERE id=?',
						[req.params.id],
						(err2, results2) => {
							routeResponse(res, err2, results2);
						}
					);
				}
			}
		);
	}
});

app.put('/track/:id', (req, res) => {
	if (
		!req.body.title ||
		!req.body.playlist_id ||
		!req.body.artist ||
		!req.body.album_picture ||
		!req.body.youtube_url
	) {
		res.status(412).send({
			message:
				'Please, send request with valid body :  {playlist_id: 28, title: title, artist: artist, album_picture: album picture, youtube_url: youtube url}',
		});
	} else {
		const track = JSON.parse(JSON.stringify(req.body));
		sql.query(
			`UPDATE track SET ? where id=${req.params.id}`,
			track,
			(err1, results1) => {
				if (err1) {
					console.trace(err1);
					res.status(500).send(err1);
				} else {
					sql.query(
						'SELECT * FROM track WHERE id=?',
						[req.params.id],
						(err2, results2) => {
							routeResponse(res, err2, results2);
						}
					);
				}
			}
		);
	}
});

// INSERT INTO

app.post('/playlist', (req, res) => {
	console.log(req.body.title, req.body.genre);

	if (!req.body.title || !req.body.genre) {
		res.status(412).send({
			message:
				'Please, send request with valid body : {title : titre, genre: genre}',
		});
	} else {
		const newPlaylist = JSON.parse(JSON.stringify(req.body));
		console.log(newPlaylist, typeof newPlaylist);
		sql.query('INSERT INTO `playlist` SET ? ', newPlaylist, (err, results) => {
			routeResponse(res, err, results);
		});
	}
});

app.post('/track', (req, res) => {
	if (
		!req.body.title ||
		!req.body.playlist_id ||
		!req.body.artist ||
		!req.body.album_picture ||
		!req.body.youtube_url
	) {
		res.status(412).send({
			message:
				'Please, send request with valid body :  {playlist_id: 28, title: title, artist: artist, album_picture: album picture, youtube_url: youtube url}',
		});
	} else {
		const newTrack = JSON.parse(JSON.stringify(req.body));
		sql.query('INSERT INTO `track` SET ? ', newTrack, (err, results) => {
			routeResponse(res, err, results);
		});
	}
});

//SELECT ALL

app.get('/tracks', (req, res) => {
	const params = req.query;
	if (Object.keys(params).length === 0) {
		sql.query('SELECT * FROM track', (err, results) => {
			routeResponse(res, err, results);
		});
	} else {
		sql.query('SELECT * FROM track WHERE ?', params, (err, results) => {
			routeResponse(res, err, results);
		});
	}
});

app.get('/playlists', (req, res) => {
	const params = req.query;
	if (Object.keys(params).length === 0) {
		sql.query('SELECT * FROM playlist', (err, results) => {
			routeResponse(res, err, results);
		});
	} else {
		sql.query('SELECT * FROM playlist WHERE ?', params, (err, results) => {
			routeResponse(res, err, results);
		});
	}
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
