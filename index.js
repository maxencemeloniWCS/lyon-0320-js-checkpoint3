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

// en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist
app.post('/playlist', (req, res) => {
  const data = req.body;
  console.log(data);
// connexion à la base de données, et insertion d'une playlist
  connection.query('INSERT INTO playlist SET ?', data, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'une playlist");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(201);
    }
  });
});

// Lancement du serveur
app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${process.env.PORT}`);
});