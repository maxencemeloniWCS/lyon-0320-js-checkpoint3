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

app.post(
  '/user/playlists',
  (req, res) => {
    
    if (!req.body.title) {
      return res.status(422).json({ errors: 'title manquant' });
    }
    if (!req.body.genre) {
      return res.status(422).json({ errors: 'genre manquant' });
    }
    return connection.query('INSERT INTO playlist SET ?', req.body, (err, results) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      }
      return connection.query('SELECT * FROM playlist WHERE id = ?', results.insertId, (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const insertedUser = records[0];
        const { password, ...user } = insertedUser;
        const host = req.get('host');
        const location = `http://${host}${req.url}/${user.id}`;
        return res
          .status(201)
          .set('Location', location)
          .json(user);
      });
    });
  },
);

app.post(
  '/user/tracks',
  (req, res) => {
    
    if (!req.body.playlist_id) {
      return res.status(422).json({ errors: 'playlist manquant' });
    }
    if (!req.body.title) {
      return res.status(422).json({ errors: 'title manquant' });
    }
    if (!req.body.artist) {
      return res.status(422).json({ errors: 'artist manquant' });
    }
    if (!req.body.album_picture) {
      return res.status(422).json({ errors: 'image manquant' });
    }
    return connection.query('INSERT INTO track SET ?', req.body, (err, results) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      }
      return connection.query('SELECT * FROM track WHERE id = ?', results.insertId, (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const insertedUser = records[0];
        const { password, ...user } = insertedUser;
        const host = req.get('host');
        const location = `http://${host}${req.url}/${user.id}`;
        return res
          .status(201)
          .set('Location', location)
          .json(user);
      });
    });
  },
);

app.get('/user/playlists', (req, res) => {

  connection.query('SELECT * FROM playlist', (err, results) => {

    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });

    } else if (results.length === 0) {

      res.status(404).json({error: 'Playlist not found'});

    } else {
      res.json(results);
    }
  });
});

app.get('/user/tracks', (req, res) => {

  connection.query('SELECT * FROM track', (err, results) => {

    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });

    } else if (results.length === 0) {

      res.status(404).json({error: 'Track not found'});

    } else {
      res.json(results);
    }
  });
});

app.get('/user/playlists/:id', (req, res) => {

  const playlistId = req.params.id;

  connection.query('SELECT * FROM playlist WHERE id = ?', [playlistId], (err, results) => {

    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });

    } else if (results.length === 0) {

      res.status(404).json({error: 'Playlist not found'});

    } else {
      res.json(results[0]);
    }
  });
});

app.get('/user/playlists/:id/listing', (req, res) => {

  const playlistId = req.params.id;

  connection.query('SELECT t.*, p.title FROM playlist p JOIN track t ON p.id = t.playlist_id WHERE p.id = ?', [playlistId], (err, results) => {

    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });

    } else if (results.length === 0) {

      res.status(404).json({error: 'Playlist not found'});

    } else {
      res.json(results);
    }
  });
});

app.get('/user/playlist', (req, res) => {
 
  let sql = 'SELECT * FROM playlist';
  const sqlValues = [];
 
  if (req.query.title) {
 
    sql += 'WHERE title = ?';
    sqlValues.push(req.query.title);
 
  }
 
  if (req.query.genre) {
 
    if (req.query.title) {
 
      sql += 'AND genre = ?';
 
    }else{
 
      sql += 'WHERE genre = ?';
    }
    sqlValues.push(req.query.genre);
  }
 
  connection.query(sql, sqlValues, (err, results) => {
 
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/user/track', (req, res) => {
 
  let sql = 'SELECT * FROM track';
  const sqlValues = [];
 
  if (req.query.title) {
 
    sql += 'WHERE title = ?';
    sqlValues.push(req.query.title);
 
  }
 
  if (req.query.artist) {
 
    if (req.query.title) {
 
      sql += 'AND artist = ?';
 
    }else{
 
      sql += 'WHERE artist = ?';
    }
    sqlValues.push(req.query.artist);
  }
 
  connection.query(sql, sqlValues, (err, results) => {
 
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      res.json(results);
    }
  });
});

app.delete('/user/playlists/:id', (req, res) => {

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

app.delete('/user/playlists/:id/delete-track/:id-track', (req, res) => {

  const idPlaylist = req.params.id;
  const idTrack = req.params.id-track;

  connection.query('DELETE t FROM track t JOIN playlist p ON t.playlist_id = p.id WHERE t.id = ? AND p.id', [idTrack, idPlaylist], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une musique");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put(
  '/user/playlists/:id',

  (req, res) => {
    if (!req.body.title) {
      return res.status(422).json({ errors: 'title manquant' });
    }
    if (!req.body.genre) {
      return res.status(422).json({ errors: 'genre manquant' });
    }
    return connection.query('UPDATE playlist SET ? WHERE id = ?', [req.body, req.params.id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      }
      return connection.query('SELECT * FROM playlist WHERE id = ?', req.params.id, (err2, records) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql,
          });
        }
        const insertedUser = records[0];
        const { password, ...user } = insertedUser;
        const host = req.get('host');
        const location = `http://${host}${req.url}/${user.id}`;
        return res
          .status(200)
          .set('Location', location)
          .json(user);
      });
    });
  },
);


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});