const express = require("express");
const router = express.Router();
const db = require("../database/mysql");

//find (bonus)
router.get("/", function (req, res) {
  db.query(
    "SELECT song.title, song.artist, song.album_cover, song.youtube_url, playlist.genre FROM song JOIN playlist ON song.playlist_id = playlist.id",
    (err, results) => {
      if (err) {
        res.status(500).send("Server issue:" + err);
      } else {
        res.json(results);
      }
    }
  );
});

//findone
router.get("/:id", (req, res) => {
  const songId = req.params.id;
  db.query(
    "SELECT id, title, artist FROM song WHERE id=?",
    [songId],
    (err, results) => {
      if (err) {
        res.status(500).send("Server issue:" + err);
      } else {
        res.json(results);
      }
    }
  );
});

//findwheretitle
router.get("/playlist/:playlistId", (req, res) => {
  const playlistId = req.params.playlistId;
  db.query(
    "SELECT id, title, artist, album_cover, youtube_url FROM song WHERE playlist_id=?",
    [playlistId],
    (err, results) => {
      if (err) {
        res.status(500).send("Server issue:" + err);
      } else {
        res.json(results);
      }
    }
  );
});

//add
router.post("/", (req, res) => {
  const datas = req.body;
  db.query("INSERT INTO song SET ?", [datas], (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      db.query(
        "SELECT title, artist FROM song WHERE id=?",
        [results.insertId],
        (err, results) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(results);
          }
        }
      );
    }
  });
});

//delete
router.delete("/:id", (req, res) => {
  const songId = req.params.id;
  db.query("DELETE FROM song WHERE id=?", [songId], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Successfully deleted");
    }
  });
});

//update
router.put("/:id", (req, res) => {
  const datas = req.body;
  const songId = req.params.id;
  db.query("UPDATE song SET ? WHERE id=?", [datas, songId], (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      db.query(
        "SELECT title, artist, album_cover, youtube_url, playlist_id FROM song WHERE id=?",
        [songId],
        (err, results) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(results);
          }
        }
      );
    }
  });
});

module.exports = router;
