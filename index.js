const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
app.post('/playlists', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la création de la playlist");
    } else {
      res.json(req.body);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).
app.get('/playlists/:id', (req, res) => {
  connection.query('SELECT * from playlist WHERE id = ?',[req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération de la track');
    } else {
      res.json(results).status(200);
    }
  });
});

// en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.
app.post('/playlists/:id/tracks', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO track SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la création du morceau");
    } else {
      res.json(results);
    }
  });
});

// en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
app.get('/playlists/:id/tracks', (req, res) => {
  connection.query('SELECT * from track WHERE track.playlist_id = ?',[req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération de la track');
    } else {
      res.json(results);
    }
  });
});


//en tant qu'utilisateur, je veux pouvoir supprimer une playlist.
app.delete('/playlists/:id', (req, res) => {
  connection.query('DELETE FROM playlist WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une playlist");
    } else {
      res.sendStatus(200);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir modifier une playlist.
app.put('/playlists/:id', (req, res) => {
  connection.query('UPDATE playlist SET ? WHERE id = ?', [req.body, req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'une playlist");
    } else {
      res.json(req.body);
    }
  });
});

// en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.
app.delete('/playlists/:id/tracks/:trackId', (req, res) => {
  connection.query('DELETE FROM track where id = ?', req.params.trackId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression du morceau");
    } else {
      res.sendStatus(200);
    }
  });
});

// en tant qu'utilisateur, je veux modifier un morceau d'une playlist.
app.put('/playlists/:id/tracks/:trackId', (req, res) => {
  connection.query('UPDATE track SET ? WHERE id = ?', [req.body, req.params.trackId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression du morceau");
    } else {
      res.json(req.body);
    }
  });
});

// BONUS mamène
// GET / playlists - ALL PLAYLISTS
app.get('/playlists', (req, res) => {
  let sql = 'SELECT * FROM playlist ';
  sqlValues = [];

  if (req.query.genre) {
    sql += 'WHERE genre = ?'
    sqlValues.push(req.query.genre);
  } 

  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      console.log(err);
      res.status(404).send('Playlist not found');
    } else {
      res.json(results);
    }
  })
})

// GET / playlists - ALL TRACKS
app.get('/tracks', (req, res) => {
  let sql = 'SELECT * FROM track ';
  sqlValues = [];

  if (req.query.artist) {
    sql += 'WHERE artist = ?'
    sqlValues.push(req.query.artist);
  } 

  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      console.log(err);
      res.status(404).send('Track not found');
    } else {
      res.json(results);
    }
  })
})


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});
