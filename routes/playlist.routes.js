const router = require('express').Router();
const db = require('../conf');

// en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
router.post('/', (req, res) => {
  const formData = req.body;
  db.query('INSERT INTO playlist SET ?', formData, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.status(201).json(formData)
    }
  })
})

// en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).
router.get('/:id', (req, res) => {
  const idPlaylist = req.params.id;
  db.query('SELECT * FROM playlist WHERE id = ?', [idPlaylist], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      console.log(results)
      results[0] === undefined ? res.status(404).send('Playlist not found') : res.json(results[0]);
    }
  })
})

// en tant qu'utilisateur, je veux pouvoir supprimer une playlist.
router.delete('/:id', (req, res) => {
  const idPlaylist = req.params.id;
  db.query('DELETE FROM playlist WHERE id = ?', [idPlaylist], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      console.log(results)
      results.affectedRows ? res.status(200).json({ id : idPlaylist }) : res.status(404).send('Playlist not found') ;
    }
  })
})

// en tant qu'utilisateur, je veux pouvoir modifier une playlist.
router.put('/:id', (req, res) => {
  const idPlaylist = req.params.id;
  const formData = req.body;
  db.query('UPDATE playlist SET ? WHERE id = ?', [formData, idPlaylist], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!results.affectedRows){
      res.status(404).send('Playlist not found')
    } else {
      return db.query('SELECT * FROM playlist WHERE id = ?', [idPlaylist], (err2, records) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).json(records[0])
        }
      })
    }
  })
})

module.exports = router;