const routerTrack = require('express').Router();
const connection = require('./config')

//en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.
routerTrack.post('/',(req, res) => {
  console.log(req.body);
  
  if (!req.body) {
    return res.status(422).json({ errors: errors.array() });
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
      const insertedtrack = records[0];
      const host = req.get('host');
      const location = `http://host${req.url}/${insertedtrack.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(insertedtrack);
    });
  });
},
);


//en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
routerTrack.get('/playlist/:id', (req, res) => {
  const id= req.param.id;
  console.log(id);

  connection.query('SELECT * FROM track AS t JOIN playlist AS p ON p.id = t.playlist_id WHERE p.id=1;', (err, results) => {
    if (err) {
      return res.status(500).send(`An error occurred: ${err.message}`);
    }
    if (results.length === 0) {
      return res.status(404).send('not found');
    }
    return res.json(results);
  });
});

// Toutes les pistes
routerTrack.get('/', (req, res) => {
  connection.query('SELECT * FROM track', (err, results) => {
    if (err) {
      return res.status(500).send(`An error occurred: ${err.message}`);
    }
    if (results.length === 0) {
      return res.status(404).send('playlist not found');
    }
    return res.json(results);
  });
});

// en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.
routerTrack.delete('/:id', (req, res) => {

  // récupération des données envoyées
  const idtrack = req.params.id;
  connection.query('DELETE FROM track WHERE id = ?', [idtrack], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une playliste");
    } else {
      res.sendStatus(200);
    }
  });
});


// en tant qu'utilisateur, je veux modifier un morceau d'une playlist.
routerTrack.put('/:id',(req, res) => {
  if (!req.body) {
    return res.status(422).json('error');
  }
  return connection.query('UPDATE track SET ? WHERE id= ?', [req.body, req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    }
    return connection.query('SELECT * FROM track WHERE id = ?', req.params.id, (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const insertedtrack = records[0];
      const host = req.get('host');
      const location = `http://host${req.url}/${insertedtrack.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(insertedtrack);
    });
  });
}
);

module.exports = routerTrack;