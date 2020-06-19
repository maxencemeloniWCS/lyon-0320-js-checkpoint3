// Checkpoint JS 3
// Étudiant : Christophe Crébier / Wild Lyon

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

// Body parser
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist
app.post('/playlist', (req, res) => {
  const data = req.body;
// connexion à la base de données, et insertion d'une playlist
  connection.query('INSERT INTO playlist SET ?', data, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'une playlist");
    } else {
      // We use the insertId attribute of results to build the WHERE clause
      return connection.query('SELECT * FROM playlist WHERE id = ?', results.insertId, (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });o
        }
        // If all went well, records is an array, from which we use the 1st item
        const playlist = records[0];
        return res
          .status(200)
          .json(playlist);
      });
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id
// dans l'url (juste ses données propres, pas les pistes associées).
app.get('/playlist/:id', (req, res) => {
  const idPlaylist = req.params.id;
  connection.query('SELECT * FROM playlist WHERE id = ?', idPlaylist, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    } else {
      res.status(200).json(results);
    }
  });
});

// en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.
// BESOINS :
// - id de la playlist dans l'URL
// - champs de la piste dans le body
app.post('/track/:playlist', (req, res) => {
  const idPlaylist = req.params.playlist; // récupère l'id de la playlist
  const data = { ...req.body, playlist_id: idPlaylist }; // combine les données du body + l'id playlist
  // connexion à la base de données, et insertion d'une piste
  connection.query('INSERT INTO track SET ?', data, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la création d'une piste");
    } else {
      // We use the insertId attribute of results to build the WHERE clause
      return connection.query('SELECT * FROM track WHERE id = ?', results.insertId, (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });o
        }
        // If all went well, records is an array, from which we use the 1st item
        const playlist = records[0];
        return res
          .status(200)
          .json(playlist);
      });
    }
  });
});

// en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
// APPEL : /track?playlist=nn
app.get('/track', (req, res) => {
  const idPlaylist = req.query.playlist;
  connection.query('SELECT * FROM track AS t JOIN playlist AS p ON p.id = t.playlist_id WHERE p.id = ?;', idPlaylist, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    } else {
      res.status(200).json(results);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir supprimer une playlist
// APPEL : /playlist/n
app.delete('/playlist/:id', (req, res) => {
  const idPlaylist = req.params.id;
  connection.query('DELETE FROM playlist WHERE id = ?;', idPlaylist, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    } else {
      res.sendStatus(200);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir modifier une playlist.
// BESOINS:
// - id de la playlist à modifier dans l'URL
// - données dans le body
app.put('/playlist/:playlist', (req, res) => {
  const idPlaylist = req.params.playlist; // récupère l'id de la playlist
  const data = req.body; // combine les données du body + l'id playlist
  console.log(data);
  // connexion à la base de données, et insertion d'une piste
  connection.query('UPDATE playlist SET ? WHERE id = ?', [data, idPlaylist], (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send('Erreur lors de la modification de la playlist');
    } else {
      // We use the insertId attribute of results to build the WHERE clause
      return connection.query('SELECT * FROM playlist WHERE id = ?', idPlaylist, (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        // If all went well, records is an array, from which we use the 1st item
        const playlist = records[0];
        return res
          .status(200)
          .json(playlist);
      });
    }
  });
});

// en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.
app.delete('/track/:id', (req, res) => {
  const idTrack = req.params.id;
  connection.query('DELETE FROM track WHERE id = ?;', idTrack, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    } else {
      res.sendStatus(200);
    }
  });
});

// en tant qu'utilisateur, je veux modifier un morceau d'une playlist.
// BESOINS:
// - id du morceau à modifier dans l'URL
// - données dans le body
app.put('/track/:id', (req, res) => {
  const idTrack = req.params.id; // récupère l'id de la playlist
  const data = req.body; // combine les données du body + l'id playlist
  console.log(data);
  // connexion à la base de données, et insertion d'une piste
  connection.query('UPDATE track SET ? WHERE id = ?', [data, idTrack], (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send('Erreur lors de la modification de la playlist');
    } else {
      // We use the insertId attribute of results to build the WHERE clause
      return connection.query('SELECT * FROM track WHERE id = ?', idTrack, (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        // If all went well, records is an array, from which we use the 1st item
        const playlist = records[0];
        return res
          .status(200)
          .json(playlist);
      });
    }
  });
});

//
// BONUS
//

// Créer deux routes permettant de récupérer :
// toutes les playlists (par exemple /playlists)
// tous les morceaux (/tracks), indépendamment de la playlist à laquelle ils sont associés.
app.get('/playlists', (req, res) => {
  connection.query('SELECT * FROM playlist;', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/tracks', (req, res) => {
  connection.query('SELECT * FROM track;', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    } else {
      res.status(200).json(results);
    }
  });
});

// Créer deux routes permettant de récupérer :
// toutes les playlists (par exemple /playlists)
// tous les morceaux (/tracks), indépendamment de la playlist à laquelle ils sont associés.
// APPEL : /playlists?search=xx (où xx représente une partie du genre ou du nom de la playlist)
app.get('/playlist2', (req, res) => {
  const search = req.query.search;
  connection.query('SELECT * FROM playlist WHERE title LIKE "%t%";', (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql 
      });
    } else {
      res.status(200).json(results);
    }
  });
});

// Lancement du serveur
app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${process.env.PORT}`);
});