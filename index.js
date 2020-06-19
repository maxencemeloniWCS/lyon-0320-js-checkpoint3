const express = require('express');
const connection = require('./conf');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Test Welcome

app.get('/', (req, res) => {
  res.send('Welcome to our site!');
});

// en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.

app.post('/api/playlists/', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'ajout d'une playlist");
    } else {
      console.log(results)
      res.status(201).json(results);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).

app.get('/api/playlists/:id', (req, res) => {
  const idPlaylist = req.params.id;
  connection.query('SELECT * FROM playlist WHERE id = ?', idPlaylist, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération d'une playlist");
    } else {
      res.status(200).json(results);
    }
  });
});

// en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.

app.post('/api/tracks/', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO track SET ? ', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'ajout d'un morceau");
    } else {
      console.log(results)
      res.status(201).json(results);
    }
  });
});

// en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.

app.get('/api/playlists/:id/all', (req, res) => {
  const idPlaylist = req.params.id;
  connection.query('SELECT * FROM track t LEFT JOIN playlist p ON t.playlist_id = p.id WHERE t.playlist_id = ?', [idPlaylist], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des morceaux d'une playlist");
    } else {
      res.status(200).json(results);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir supprimer une playlist.

app.delete('/api/playlists/:id', (req, res) => {
  const idPlaylist = req.params.id;
  connection.query('DELETE FROM playlist WHERE id = ?', idPlaylist, err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un film");
    } else {
      res.sendStatus(200);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir modifier une playlist.

app.put('/api/playlists/:id', (req, res) => {
  const idPlaylist = req.params.id;
  const formData = req.body;
  connection.query('UPDATE playlist SET ? WHERE id = ?', [formData, idPlaylist], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification d\'une playlist');
    } else {
      res.status(200).json(results);
    }
  })
})

// en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.
// en tant qu'utilisateur, je veux modifier un morceau d'une playlist.

app.put('/api/playlists/:id/tracks/:trackId', (req, res) => {
  const idPlaylist = req.params.id;
  const idTrack = req.params.trackId;
  const formData = req.body;
  connection.query('UPDATE track SET ? WHERE playlist_id = ? AND id = ?', [formData, idPlaylist, idTrack], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un morceau");
    } else {
      res.status(200).json(results);
    }
  });
});

// BONUS
// GET all playlists / Filter by genre

app.get('/api/playlists', (req, res) => {
  const genre = req.query.genre;
  if (genre) {
    connection.query('SELECT * FROM playlist WHERE genre = ?', genre, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sélection des playlists");
      } else {
        res.status(200).json(results);
      }
    })
  } else {
    connection.query('SELECT * FROM playlist', (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sélection des playlists");
      } else {
        res.status(200).json(results);
      }
    })
  }
})

// GET all tracks / Filter by artist

app.get('/api/tracks', (req, res) => {
  const artist = req.query.artist;
  if (artist) {
    connection.query('SELECT * FROM track WHERE artist = ?', artist, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sélection des morceaux");
      } else {
        res.status(200).json(results);
      }
    })
  } else {
    connection.query('SELECT * FROM track', (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sélection des morceaux");
      } else {
        res.status(200).json(results);
      }
    })
  }
})

///////////////////////////////////////////////////////////////

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});