require("dotenv").config();
const express = require("express");
const app = express();
const port = 1234;
const db = require("./db");

// support du json dans le body de la requête
app.use(express.json());
// support du format url-encoded dans le body de la requête
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/playlists", (req, res) => {
  if (!req.body) {
    res
      .status(400)
      .send({ errorMessage: "playlist content can not be empty !" });
  } else if (!req.body.title) {
    console.log(req.body.title);

    res.status(400).send({ errorMessage: "playlist title can not be empty !" });
  }
  let newPlaylist = req.body;
  console.log(newPlaylist);
  db.query("INSERT INTO playlists SET ?", newPlaylist, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un employé");
    } else {
      newPlaylist.id = result.insertId;
      res.status(200).send(newPlaylist);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Somthing bad happenned...");
  }

  console.log(`server is running on http://localhost:${port}`);
});
