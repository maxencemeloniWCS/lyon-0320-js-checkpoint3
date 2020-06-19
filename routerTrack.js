const routerTrack = require('express').Router();
const bodyParser = require('body-parser');

//en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.
routerTrack.post('/',(req, res) => {
  if (req.body) {
    return res.status(422).json({ errors: errors.array() });
  }
  // send an SQL query to get all track
  return connection.query('INSERT INTO track SET ?', req.body, (err, results) => {
    if (err) {
     // If an error has occurred, then the client is informed of the error
      return res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    }
    // We use the insertId attribute of results to build the WHERE clause
    return connection.query('SELECT * FROM track WHERE id = ?', results.insertId, (err2, records) => {
        if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql,
        });
      }
      const insertedtrack = records[0];
      const host = req.get('host');
      const location = `http://host${req.url}/${track.id}`;
      return res
        .status(201)
        .set('Location', location)
        .json(track);
    });
  });
},
);


//en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
routerTrack.get('/', (req, res) => {
  connection.query('SELECT * FROM track', (err, results) => {
    if (err) {
      return res.status(500).send(`An error occurred: ${err.message}`);
    }
    if (results.length === 0) {
      return res.status(404).send('not found');
    }
    return res.json(results);
  });
});


module.exports = routerTrack;