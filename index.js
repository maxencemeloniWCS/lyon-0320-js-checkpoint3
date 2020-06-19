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
// POST /playlists
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

// GET /playlists
app.get("/playlists", (req, res) => {
  db.query("SELECT * FROM playlists", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des playlists");
    } else {
      res.json(result);
    }
  });
});

// GET /playlists/:id
app.get("/playlists/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query("SELECT * FROM playlists WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération de la playlist");
    } else if (result[0] === undefined) {
      res.status(404).send("il n'y a pas de playlist ici !");
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// PUT /playlists/:id
app.put("/playlists/:id", (req, res) => {
  if (!req.body) {
    res
      .status(400)
      .send({ errorMessage: "playlist content can not be empty !" });
  } else if (!req.body.title) {
    console.log(req.body.title);
    res.status(400).send({ errorMessage: "playlist title can not be empty !" });
  }
  let updatedPlaylist = req.body;
  console.log(updatedPlaylist);
  const id = parseInt(req.params.id);
  db.query(
    "UPDATE playlists SET ? WHERE id = ?",
    [updatedPlaylist, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification de la playlist");
      } else if (result === undefined) {
        res.status(404).send("il n'y a pas de playlist ici !");
      } else {
        res.status(200).json({ id, ...updatedPlaylist });
      }
    }
  );
});

// DELETE /playlists/:id
app.delete("/playlists/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query("DELETE FROM playlists WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la suppression de la playlist");
    } else if (result === undefined) {
      res.status(404).send("il n'y a pas de playlist ici !");
    } else {
      res.status(200).send("Playlist supprimée avec succès !");
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Somthing bad happenned...");
  }

  console.log(`server is running on http://localhost:${port}`);
});
