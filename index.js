const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
	res.send('Welcome to my playlist');
});

// POSTER PLAYLIST
app.post('/playlists', (req, res) => {
	const formData = req.body;
	connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {
		if (err) {
			console.log(err);
			res.status(500).send('Erreur lors de la création de la playlist');
		} else {
			res.sendStatus(200);
		}
	});
});

// OBTENIR LES INFOS D'UNE PLAYLIST
app.get('/playlists/:id', (req, res) => {
	const playlistId = req.params.id;
	connection.query('SELECT * FROM playlist WHERE ID = ?', [playlistId], (err, results) => {
		if (err) {
			res.status(500).send('Erreur lors de la récupération des données de la playlist');
		} else if (results[0] === undefined) {
			res.status(404).send('Playlist non trouvée');
		} else {
			res.json(results);
		}
	});
});

// POSTER UN MORCEAU EN L'AFFECTANT A UNE PLAYLIST
app.post('/tracks', (req, res) => {
	const formData = req.body;
	connection.query('INSERT INTO track SET ?', formData, (err, results) => {
		if (err) {
			console.log(err);
			res.status(500).send('Erreur lors de la création du morceau');
		} else {
			res.sendStatus(200);
		}
	});
});

// OBTENIR LES MORCEAUX D'UNE PLAYLIST
app.get('/playlists/:id/tracks', (req, res) => {
	const playlistId = req.params.id;
	connection.query('SELECT * FROM track WHERE playlist_id = ?', [playlistId], (err, results) => {
		if (err) {
			res.status(500).send('Erreur lors de la récupération des morceaux de la playlist');
		} else if (results[0] === undefined) {
			res.status(404).send('Morceaux de la playlist non trouvés')
		} else {
			res.json(results);
		}
	});
});

// MODIFIER PLAYLIST
app.put('/playlists/:id', (req, res) => {
	const playlistId = req.paramas.id;
	const formData = req.body;
	conection.query('UPDATE playlist SET ? WHERE id = ?', [formData, playlistId], err => {
		if (err) {
			console.log(err);
			res.status(500).send('Erreur lors de la mise à jour de la playlist')
		} else {
			res.sendStatus(200);
		}
	})
})

// SUPPRIMER PLAYLIST
app.delete('/playlists/:id', (req, res) => {
	const playlistId = req.params.id;
	connection.query('DELETE FROM playlist WHERE id = ?', [playlistId], err => {
		if (err) {
			console.log(err);
			res.status(500).send('Erreur lors de la suppression de la playlist')
		} else {
			res.sendStatus(200);
		}
	})
})

app.delete('/tracks/:id', (req, res) => {
	const trackId = req.params.id;
	connection.query('DELETE FROM track WHERE id = ?', [trackId], err => {
		if (err) {
			console.log(err);
			res.status(500).send('Erreur lors de la suppression du morceau');
		} else {
			res.sendStatus(200);
		}
	})
});

// METTRE A JOUR MORCEAU
app.put('/tracks/:trackId', (req, res) => {
	const trackId = req.params.trackId;
	const formData = req.body;
	connection.query('UPDATE track SET ? WHERE id = ?', [formData, trackId], (err, results) => {
		if (err) {
			console.log(err);
			res.status(500).send('Erreur lors de la modification de la piste');
		} else {
			res.sendStatus(200);
		}
	});
});

//BONUS

// OBTENIR LES PLAYLISTS
app.get('/playlists', (req, res) => {
	let sql = 'SELECT * FROM playlist';
	connection.query(sql, (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).send('Erreur lors de la récupération des playlists');
		} else {
			res.json(results);
		}
	})
})

//OBTENIR TOUS LES MORCEAUX
app.get('/tracks', (req, res) => {
	connection.query('SELECT * FROM track', (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).send('Erreur lors de la récupération des morceaux');
		} else {
			res.json(results);
		}
	})
})

app.listen(port, (err) => {
	if (err) {
		throw new Error('Somehing bad happened...');
	}

	console.log(`Server is listening on ${port}`);
})