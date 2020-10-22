const { Router } = require('express');

const router = Router();
const db = require('../datasource/connection');

/* POST- Créer et affecter un morceau à une playlist */
router.post('/add', (req, res) => {

  const { title, artist, album_picture, youtube_url, playlist_id } = req.body;
  const fields = [[title, artist, album_picture, youtube_url, playlist_id]];

  db.query('INSERT INTO track (title,artist,album_picture,youtube_url,playlist_id) VALUES ?', [fields], (err, result) => {

    if (err) {
      res.status(400)
        .json({ message: err });
    } else {
      res.write(JSON.stringify(req.body));
      res.end('********** Track successfully added **********');
    }
  });

});

/* GET- Lister tous les morceaux d'une playlist */
router.get('/:id', (req, res) => {

  idPlaylist = req.params.id;

  db.query('SELECT title,artist FROM track  WHERE playlist_id= ?', idPlaylist, (err, result) => {

    if (err) {
      res.status(400)
        .json({ message: err });
    } else {
      res.json(result);
    }
  });

});

router.put('/:id', (req, res) => {

  const idTrack = req.params.id;
  const reset_playlist = req.query.reset_playlist;

  /* PUT Supprimer un morceau d'une playlist */
  if (reset_playlist == 'true') {
    const fields = { playlist_id: null };

    db.query('UPDATE  track SET ? WHERE id=?', [fields, idTrack], (err, result) => {

      if (err) {
        res.status(400)
          .json({ message: err });
      } else {
        res.json(result);
      }
    });
    /*  Modifier un morceau d'une playlist */
  } else if (!reset_playlist) {

    const { title, artist, album_picture, youtube_url } = req.body;
    const fields = {

      title: title,
      artist: artist,
      album_picture: album_picture,
      youtube_url: youtube_url

    };

    db.query('UPDATE  track SET ? WHERE id=?', [fields, idTrack], (err, result) => {

      if (err) {
        res.status(400)
          .json({ message: err });
      } else {
        res.json(req.body);
      }
    });

  }

});

module.exports = router;




