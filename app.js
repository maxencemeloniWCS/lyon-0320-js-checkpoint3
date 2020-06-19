const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

app.get('/playlists', (req, res) => {
  connection.query('SELECT * from playlists', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des playlists');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/playlists/:id', (req, res) => {
  const idPlaylist = req.params.id;
  connection.query('SELECT * from playlists WHERE id = ?', [idPlaylist], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération de la playlists');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/tracks', (req, res) => {
  connection.query('SELECT * from tracks', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des musique');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/tracks/:id', (req, res) => {
  const idTrack = req.params.id;
  connection.query('SELECT * from tracks WHERE id = ?', [idTrack], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération de la musique');
    } else {
      res.status(200).json(results);
    }
  });
});

app.use(express.json());
// Support URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}));

app.post('/playlists', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO playlists SET ?', [formData], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la sauvegarde de la playlist');
    } else {
      console.log(results);
      const insertedId = results.insertedId;
      connection.query('SELECT * from playlists WHERE id = ?', [insertedId], (err2, results2) => {
        if (err2) {
          return res.status(500).send('Erreur lors de la récupération de la musique');
        } else {
          return res.status(200).json(results2);
        }
      });
    }
  });
});

app.post('/tracks', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO tracks SET ?', [formData], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de l\'envoie de la musique');
    } else {
      res.status(200);
    }
  });
});

app.delete('/playlists/:id', (req, res) => {
  const idPlaylist = req.params.id;
  connection.query('DELETE FROM playlists WHERE id = ?', [idPlaylist], err => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification d\'un employé');
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/tracks/:id', (req, res) => {
  const idTrack = req.params.id;
  connection.query('DELETE FROM tracks WHERE id = ?', [idTrack], err => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification de la musique');
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/playlists/:id', (req, res) => {
  const idPlaylist = req.params.id;
  const formData = req.body;
  connection.query('UPDATE playlists SET ? WHERE id = ?', [formData, idPlaylist], err => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification de la playlist');
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/tracks/:id', (req, res) => {
  const idTrack = req.params.id;
  const formData = req.body;
  connection.query('UPDATE tracks SET ? WHERE id = ?', [formData, idTrack], err => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification de la musique');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
