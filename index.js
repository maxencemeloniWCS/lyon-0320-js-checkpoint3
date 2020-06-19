const express = require('express');
const connection = require('./conf');
const app = express();
const port = 3000;

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  response.send('Bienvenue sur ma page de playlist');
});
 
app.post('/playlists', (request, response) => {
  const formData = request.body;
  connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {
    if (err) {
      response.status(500).send("Erreur lors de la récupération des données de la playlist")
    } else {
      const newPlaylistId = results.insertId;
      connection.query('SELECT * FROM playlist WHERE id = ?', [newPlaylistId], (err2, res) => {
        if (err) {
          response.status(500).send("Erreur lors de la récupération des données de la playlist")
        } else {
          response.status(200).json(res[0])
        }
      })
    }
  });
});

app.get('/playlists/:id', (request, response) => {
  const playlistId = request.params.id;
  connection.query('SELECT * FROM playlist WHERE id = ?', [playlistId], (err, results) => {
    if (err) {
      response.status(500).send("Erreur lors de la récuération de la playlist")
    } else {
      response.json(results[0])
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
