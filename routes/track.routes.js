const router = require('express').Router();
const db = require('../conf');

// en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.
router.post('/', (req, res) => {
  const formData = req.body;
  db.query('INSERT INTO track SET ?', formData, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.status(201).json(formData);
    }
  })
})

// en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
router.get('/playlists/:id', (req, res) => {
  const idPlaylist = req.params.id;
  db.query('SELECT * FROM track WHERE playlist_id = ?', [idPlaylist], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      results === undefined ? res.status(404).send('Playlist not found') : res.status(200).send(results);
    }
  })
})

// en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.
router.delete('/:id', (req, res) => {
  const idTrack = req.params.id;
  db.query('DELETE FROM track WHERE id = ?', [idTrack], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      results.affectedRows ? res.status(200).json({ id : idTrack }) : res.status(404).send('track not found') ;
    }
  })
})

// en tant qu'utilisateur, je veux modifier un morceau d'une playlist.
router.put('/:id', (req, res) => {
  const idTrack = req.params.id;
  const formData = req.body;
  db.query('UPDATE track SET ? WHERE id = ?', [formData, idTrack], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!results.affectedRows){
      res.status(404).send('track not found')
    } else {
      return db.query('SELECT * FROM track WHERE id = ?', [idTrack], (err2, records) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).json(records[0])
        }
      })
    }
  })
})

// tous les morceaux 
router.get('/', (req, res) => {
  let sql = 'SELECT * FROM track';
  const sqlValues = [];
  const title = req.query.title;
  const artist = req.query.artist;
  if (title && artist){
    sql += ' WHERE title = ? AND artist = ?';
    sqlValues.push(title, artist)
  } else {
    if (title) {
      sql += ' WHERE title = ?';
      sqlValues.push(title);
    }
    if (artist) {
      sql += ' WHERE artist = ?';
      sqlValues.push(artist);
    }
  }
  db.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  })
})

module.exports = router;