require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
app.post("/playlist", (req, res) => {
  return db.query("INSERT INTO playlist SET ?", req.body, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    }
    res.status(201).send("La playlist '" + req.body.title + "' a été créée !");
  });
});

// en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).

// en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.

// en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.

// en tant qu'utilisateur, je veux pouvoir supprimer une playlist.

// en tant qu'utilisateur, je veux pouvoir modifier une playlist.

// en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.

// en tant qu'utilisateur, je veux modifier un morceau d'une playlist.

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${process.env.PORT}`);
});
