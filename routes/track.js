const express = require("express");
const router = express.Router();
const connection = require("../db");
const sqlError = require("../utils/errorSql");
const getResult = require("../utils/getReslut");

router.post("/", (req, res) => {
  connection.query("INSERT INTO track SET ?", [req.body], (err, results) => {
    if (err) {
      sqlError(res, err);
    } else {
      req.body.id = results.insertId;
      res.status(201).json(req.body);
    }
  });
});

router.get("/", (req, res) => {
  if (req.query.title) {
    connection.query(
      "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track WHERE title = ?",
      [req.query.title],
      (err, results) => {
        getResult(res, err, results);
      }
    );
  } else if (req.query.artist) {
    connection.query(
      "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track WHERE artist = ?",
      [req.query.artist],
      (err, results) => {
        getResult(res, err, results);
      }
    );
  } else {
    connection.query(
      "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track",
      (err, results) => {
        getResult(res, err, results);
      }
    );
  }
});

module.exports = router;
