// Checkpoint JS 3
// Étudiant : Christophe Crébier / Wild Lyon

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

// Body parser
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.thode
app.post('playlist', (req, res) => {
  const data = req.body;
  console.log(data);

});

// Lancement du serveur
app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${process.env.PORT}`);
});