// dotenv loads parameters (port and database config) from .env
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const connection = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/playlists/playlist', (req, res) => { 
  connection.query('SELECT * from playlist', (err, results) => { 
    if (err) {    
      res.status(500).send('Erreur lors de la récupération des playlists');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/playlists/track', (req, res) => { 
  connection.query('SELECT * from track', (err, results) => { 
    if (err) {    
      res.status(500).send('Erreur lors de la récupération des morceaux');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/playlists/playlist/:id', (req, res) => {
  const idPlaylist = req.params.id;
  connection.query('SELECT * FROM playlist WHERE id = ?', [idPlaylist], (err, results) => {
      if (err) {
          res.status(500).send('Erreur lors de la récupération de la playlist');
      } else if (results.length === 0) {
          res.status(404).send('Playlist not found');
      } else {
          res.json(results);
      }
  });
});

app.get('/api/playlists/track/:id', (req, res) => {
  const idTrack = req.params.id;
  connection.query('SELECT * FROM track WHERE id = ?', [idTrack], (err, results) => {
      if (err) {
          res.status(500).send('Erreur lors de la récupération du morceau');
      } else if (results.length === 0) {
          res.status(404).send('Track not found');
      } else {
          res.json(results);
      }
  });
});

// this route does not work now no idea why, US: en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
// app.get('/api/playlists/track/:id', (req, res) => {
//   const idPlaylist_id = req.params.id;
//   connection.query('SELECT * FROM playlist WHERE playlist_id = ?', [idPlaylist_id], (err, results) => {
//       if (err) {
//           res.status(500).send('Erreur lors de la récupération des morceaux de la playlist');
//       } else if (results.length === 0) {
//           res.status(404).send('Playlist tracks not found');
//       } else {
//           res.json(results);
//       }
//   });
// });


const playlistValidationMiddlewares = [
  check('title').isLength({ min: 2 }),
  check('genre').isLength({ min: 2 }),
];


app.post('/api/playlists/playlist', playlistValidationMiddlewares, (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  const formData = req.body;
  connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'une playlist");
    } else {
      res.sendStatus(200);
    }
  });
});

const trackValidationMiddlewares = [
  check('title').isLength({ min: 2 }),
  check('artist').isLength({ min: 2 }),
  check('playlist_id').isLength({ min: 1 }),
];


app.post('/api/playlists/track', trackValidationMiddlewares, (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  const formData = req.body;
  connection.query('INSERT INTO track SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un morceau");
    } else {
      res.sendStatus(200);
    }
  });
});


app.put(
  '/api/playlists/playlist/:id',
  playlistValidationMiddlewares,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const formData = req.body;
    const idPlaylist = req.params.id;

    return connection.query('UPDATE playlist SET ? WHERE id = ?', [formData, idPlaylist], (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      }
      return connection.query('SELECT * FROM playlist WHERE id = ?', idPlaylist, (err2) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        res.sendStatus(200);
      });
    });
  },
);

app.put(
  '/api/playlists/track/:id',
  trackValidationMiddlewares,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const formData = req.body;
    const idTrack = req.params.id;

    return connection.query('UPDATE track SET ? WHERE id = ?', [formData, idTrack], (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      }
      return connection.query('SELECT * FROM track WHERE id = ?', idTrack, (err2) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        res.sendStatus(200);
      });
    });
  },
);

app.delete('/api/playlists/playlist/:id', (req, res) => {
 
  const idPlaylist = req.params.id;
  connection.query('DELETE FROM playlist WHERE id = ?', [idPlaylist], err => {
 
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une playlist");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/api/playlists/track/:id', (req, res) => {
 
  const idTrack = req.params.id;
  connection.query('DELETE FROM track WHERE id = ?', [idTrack], err => {
 
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un morceau");
    } else {
      res.sendStatus(200);
    }
  });
});


app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${process.env.PORT}`);
});