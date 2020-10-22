const express = require("express");
const router = express.Router();

const mysql = require("../datasource/mysql");

// en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.
router.post("/", (req, res) => {
  let request = "INSERT INTO track SET ?";
  mysql.query(request, req.body, (err, result) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      mysql.query(
        "SELECT id, title, artist FROM track WHERE id = ?",
        result.insertId,
        (err2, result2) => {
          if (err2) {
            res.status(500).send({ err2 });
          } else {
            res.send({ "A new track has been created ": result2 });
          }
        }
      );
    }
  });
});

// en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
router.get("/", (req, res) => {
  let request = "SELECT id, title, artist FROM track WHERE playlist_id=?";
  mysql.query(request, req.body.playlist_id, (err, result) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.send({ "list of tracks from playlist": result });
    }
  });
});

// en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.
router.delete("/:id", (req, res) => {
  let request = "DELETE FROM track WHERE playlist_id=?";
  mysql.query(request, req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.send(`The track with id ${req.params.id} has been deleted`);
    }
  });
});

// en tant qu'utilisateur, je veux modifier un morceau d'une playlist.
router.put("/:id", (req, res) => {
  let request = "UPDATE track SET ? WHERE id=?";
  mysql.query(request, [req.body, req.params.id], (err, result) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      mysql.query(
        "SELECT id, title, artist FROM track WHERE id = ?",
        req.params.id,
        (err2, result2) => {
          if (err2) {
            res.status(500).send({ err2 });
          } else {
            res.send({ "the playlist has been modified ": result2 });
          }
        }
      );
    }
  });
});

module.exports = router;
