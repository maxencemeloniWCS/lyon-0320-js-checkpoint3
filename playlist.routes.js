const router = require("express").Router();
const db = require("./db");

// POST /playlists
router.post("/", (req, res) => {
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
      res.status(500).send("Erreur lors de la sauvegarde d'une playlist");
    } else {
      newPlaylist.id = result.insertId;
      res.status(200).send(newPlaylist);
    }
  });
});

// GET /playlists
router.get("/", (req, res) => {
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
router.get("/:id", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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
module.exports = router;
