const express = require("express");
const router = express.Router();
const db = require("../db/db");

// en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.
router.post("/", (req, res) => {
  return db.query("INSERT INTO track SET ?", req.body, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    }
    res.status(201).send("Le morceau '" + req.body.title + "' a été créé !");
  });
});

// en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.

router.delete("/:id", (req, res) => {
  let idTrack = req.params.id;
  db.query("DELETE FROM track WHERE id = ?", [idTrack], (err) => {
    if (err) {
      res.status(500).json({ error: err.message, sql: err.sql });
    } else {
      res.status(200).send(`Le morceau "${idTrack}" a été supprimé !`);
    }
  });
});

// en tant qu'utilisateur, je veux modifier un morceau d'une playlist.
router.put("/:id", (req, res) => {
  const idTrack = req.params.id;
  const formData = req.body;
  db.query("UPDATE track SET ? WHERE id = ?", [formData, idTrack], (err) => {
    if (err) {
      res.status(500).json({ error: err.message, sql: err.sql });
    } else {
      res.status(200).send(`Le morceau "${idTrack}" a été mis à jour !`);
    }
  });
});

// Avoir toutes les playlist (ça c'est pour moi, plus simple pour tester mes routes derrière :))
router.get("/", (req, res) => {
  db.query(
    "SELECT id, title, artist, album_picture, youtube_url FROM track",
    (err, results) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

module.exports = router;
