const { Router } = require('express');

const router = Router();

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const db = require('../db_conf');

// 01 en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.

router.post('/playlists', (req, res) => {
  db.query('INSERT INTO playlist SET ?', req.body, (err, results) => {
    if (err) {
      res.status(500).send('Erreur de création de la playlist');
    } else {
      res.status(201).json(req.body);
    }
  });
});

// 02 en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).

router.get('/playlists/:id', (req, res) => {
  db.query('SELECT title, genre FROM playlist WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur de récupération de la playlist');
    } else {
      res.status(200).json(results);
    }
  });
});

// 03 en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.

router.post('/playlists/:id/tracks', (req, res) => {
  let formData = req.body;
  formData.playlist_id = req.params.id;
  db.query('INSERT INTO track SET ?', [formData], (err, results) => {
    if (err) {
      res.status(500).send('Erreur de création de la piste');
    } else {
      res.status(201).json(results);
    }
  });
});

// 04 en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.

router.get('/playlists/:id/tracks', (req, res) => {
  db.query(
    'SELECT title, artist, album_picture, youtube_url FROM track WHERE track.playlist_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send('Erreur de récupération des pistes de la playlist');
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// 05 en tant qu'utilisateur, je veux pouvoir supprimer une playlist.

router.delete('/playlists/:id', (req, res) => {
  db.query('DELETE FROM playlist WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur de suppression de la playlist');
    } else {
      res.status(200).json('Playlist supprimée !');
    }
  });
});

// 06 en tant qu'utilisateur, je veux pouvoir modifier une playlist.

router.put('/playlists/:id', (req, res) => {
  db.query('UPDATE playlist SET ? WHERE id = ?', [req.body, req.params.id], (err, result1) => {
    if (err) {
      res.status(500).send('Erreur de modification de la playlist');
    } else {
      db.query('SELECT title, genre FROM playlist WHERE id = ?', [req.params.id], (req, result2) => {
        if (err) {
          res.status(500).send('Erreur');
        }
        res.status(200).json(result2);
      });
    }
  });
});

// 07 en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.

router.delete('/playlists/:playlist_id/tracks/:track_id', (req, res) => {
  db.query('UPDATE track SET ? WHERE id = ?', [{ playlist_id: null }, req.params.track_id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur de suppression de la piste');
    } else {
      res.status(200).json('Piste supprimée de la playlist');
    }
  });
});

// 08 en tant qu'utilisateur, je veux modifier un morceau d'une playlist.

router.put('/playlists/:playlist_id/tracks/:track_id', (req, res) => {
  db.query('UPDATE track SET ? WHERE id = ?', [req.body, req.params.track_id], (err, result1) => {
    if (err) {
      res.status(500).send('Erreur de modification de la piste');
    } else {
      db.query(
        'SELECT title, artist, album_picture, youtube_url from track WHERE track.id = ?',
        [req.params.track_id],
        (req, result2) => {
          if (err) {
            res.status(500).send('Erreur');
          }
          res.status(200).json(result2);
        }
      );
    }
  });
});

// 09 toutes les playlists (par exemple /playlists)

router.get('/playlists/', (req, res) => {
  db.query('SELECT title, genre from playlist WHERE 1', (err, results) => {
    if (err) {
      res.status(500).send('Erreur de récupération des playlists');
    } else {
      res.status(200).json(results);
    }
  });
});

// 10 tous les morceaux (/tracks), indépendamment de la playlist à laquelle ils sont associés.

router.get('/tracks/', (req, res) => {
  db.query('SELECT title, artist, album_picture, youtube_url, playlist_id FROM track WHERE 1', (err, results) => {
    if (err) {
      res.status(500).send('Erreur de récupération des playlists');
    } else {
      res.status(200).json(results);
    }
  });
});

// Si le temps le permet, ajoute la possibilité de filtrer selon les critères suivants :

// 12 pour les playlists, par le titre ou le genre

// 13 pour les morceaux, par le titre ou l'artiste

module.exports = router;
