const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// GET A PLAYLIST

app.get('/api/playlist', (req, res) => {

  connection.query('SELECT * from playlist', (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des musiques');
    } else {
      res.json(results);
    }
  });
});

// POST A NEW TRACK

app.post('/api/track', (req, res) => {

  const formData = req.body;
  console.log(req.body);
  connection.query('INSERT INTO track SET ?', formData, (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'une musique");
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});

// POST A NEW PLAYLIST

app.post('/api/playlist/:id', (req, res) => {

  const formData = req.body;
  console.log(req.body);
  connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'édition d'une nouvelle playlist");
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});