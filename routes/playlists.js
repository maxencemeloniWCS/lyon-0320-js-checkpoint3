const express = require("express");
const router = express.Router();
const db = require("../db/db");

// en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
router.post("/", (req, res) => {
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
router.get("/:id", (req, res) => {
  let idPlaylist = req.params.id;
  db.query(
    "SELECT id, title, genre FROM playlist WHERE id = ?",
    [idPlaylist],
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

// en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
router.get("/:id/tracks", (req, res) => {
  let idPlaylist = req.params.id;
  db.query(
    "SELECT id, title, artist, album_picture, youtube_url FROM track WHERE playlist_id = ?",
    [idPlaylist],
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

// en tant qu'utilisateur, je veux pouvoir supprimer une playlist.
router.delete("/:id", (req, res) => {
  let idPlaylist = req.params.id;
  db.query("DELETE FROM playlist WHERE id = ?", [idPlaylist], (err) => {
    if (err) {
      res.status(500).json({ error: err.message, sql: err.sql });
    } else {
      res.status(200).send(`La playlist "${idPlaylist}" a été supprimée !`);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir modifier une playlist.

router.put("/:id", (req, res) => {
  const idPlaylist = req.params.id;
  const formData = req.body;
  db.query(
    "UPDATE playlist SET ? WHERE id = ?",
    [formData, idPlaylist],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message, sql: err.sql });
      } else {
        res.status(200).send(`La playlist "${idPlaylist}" a été mise à jour !`);
      }
    }
  );
});

// Avoir toutes les playlist (ça c'est pour moi, plus simple pour tester mes routes derrière :))
router.get("/", (req, res) => {
  db.query("SELECT id, title, genre FROM playlist", (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
