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
            res.status(201).json(results);
          }
        }
      );
    }
  });
});

router.get("/", (req, res) => {
  if (req.query.title) {
    connection.query(
      "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track WHERE title = ?",
      [req.query.title],
      (err, results) => {
        if (err) {
          res.status(500).send({
            error: err.message,
            sql: err.sql,
          });
        } else if (results != "") {
          res.status(200).json(results);
        } else {
          res.status(404);
        }
      }
    );
  } else if (req.query.artist) {
    connection.query(
      "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track WHERE artist = ?",
      [req.query.artist],
      (err, results) => {
        if (err) {
          res.status(500).send({
            error: err.message,
            sql: err.sql,
          });
        } else if (results != "") {
          res.status(200).json(results);
        } else {
          res.status(404);
        }
      }
    );
  } else {
    connection.query(
      "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track",
      (err, results) => {
        if (err) {
          res.status(500).send({
            error: err.message,
            sql: err.sql,
          });
        } else if (results != "") {
          res.status(200).json(results);
        } else {
          res.status(404);
        }
      }
    );
  }
});

module.exports = router;
