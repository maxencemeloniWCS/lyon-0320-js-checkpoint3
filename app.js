const express = require("express");
const app = express();
const port = 3000;
const db = require("./datasource/mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});

app.get("/", function (req, res) {
  res.send("All good");
});

//en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
app.post("/playlist", (req, res) => {
  const formData = req.body;
  console.log(formData);
  db.query(`INSERT INTO playlist SET ?`, [formData], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'une playlist");
    } else {
      res.sendStatus(200);
    }
  });
});

//en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).

// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

app.get("/playlist/:id", (req, res) => {
  const idPlaylist = req.params.id;
  console.log(idPlaylist);
  db.query("SELECT * FROM playlist WHERE id = ?", [idPlaylist], (err, results) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`);
    } else if (results.length === 0) {
      res.status(404).send("Movie not found");
    } else {
      res.json(results[0]);
    }
  });
});
