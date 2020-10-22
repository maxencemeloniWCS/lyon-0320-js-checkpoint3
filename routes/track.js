const express = require("express");
const router = express.Router();
const connection = require("../db");

router.post("/", (req, res) => {
  connection.query("INSERT INTO track SET ?", [req.body], (err, results) => {
    if (err) {
      res.status(500).send({
        error: err.message,
        sql: err.sql,
      });
    } else {
      connection.query(
        "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track WHERE title = ?",
        [req.body.title],
        (err, results) => {
          if (err) {
            res.status(500).send({
              error: err.message,
              sql: err.sql,
            });
          } else {
            res.status(200).json(results);
          }
        }
      );
    }
  });
});

module.exports = router;
