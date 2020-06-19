const routerPlaylist = require('express').Router();
const connection = require('./config')

//en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
routerPlaylist.post('/', (req,res) => {
  console.log(req.body)
      if (!req.body) {
        return res.status(422).send('erreur ');
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
          const insertedplaylist = records[0];
          const host = req.get('host');
          const location = `http://host${req.url}/${insertedplaylist.id}`;
          return res
            .status(201)
            .set('Location', location)
            .json(insertedplaylist);
        });
      });
    },
    );

//en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).

routerPlaylist.get('/:id', (req, res) => {
  console.log(req.params.id);
  connection.query('SELECT * FROM playlist WHERE id = ?', req.params.id, (err, results) => {
    if (err) {
      return res.status(500).send(`An error occurred: ${err.message}`);
    }
    if (results.length === 0) {
      return res.status(404).send('playlist not found');
    }
    return res.json(results[0]);
  });
});

//en tant qu'utilisateur, je veux pouvoir supprimer une playlist.
routerPlaylist.delete('/:id', (req, res) => {

  // récupération des données envoyées
  const idplaylist = req.params.id;
  connection.query('DELETE FROM playlist WHERE id = ?', [idplaylist], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une playliste");
    } else {
      res.sendStatus(200);
    }
  });
});

//en tant qu'utilisateur, je veux pouvoir modifier une playlist.
routerPlaylist.put('/:id',(req, res) => {
    if (!req.body) {
      return res.status(422).json('error');
    }
    return connection.query('UPDATE playlist SET ? WHERE id= ?', [req.body, req.params.id], (err, results) => {
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
        const insertedplaylist = records[0];
        const host = req.get('host');
        const location = `http://host${req.url}/${insertedplaylist.id}`;
        return res
          .status(201)
          .set('Location', location)
          .json(insertedplaylist);
      });
    });
  }
);

module.exports = routerPlaylist;