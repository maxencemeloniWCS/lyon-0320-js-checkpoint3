const express = require("express");
const router = express.Router();
const connection = require("../db");
const { route } = require("./track");

router.post("/", (req, res) => {
  connection.query("INSERT INTO playlist SET ?", [req.body], (err, results) => {
    if (err) {
      res.status(500).send({
        error: err.message,
        sql: err.sql,
      });
    } else {
      connection.query(
        "SELECT id, title, genre FROM playlist WHERE title = ?",
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

router.get("/:id", (req, res) => {
  connection.query(
    "SELECT id, title, genre FROM playlist WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      } else if (results != "") {
        res.status(200).json(results);
      } else {
        res.sendStatus(404);
      }
    }
  );
});

router.get("/:id/tracks", (req, res) => {
  connection.query(
    "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track where playlist_id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send({
          error: err.message,
          sql: err.sql,
        });
      } else if (results != "") {
        res.status(200).json(results);
      } else {
        res.sendStatus(404);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  connection.query(
    "DELETE FROM playlist WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.put("/:id", (req, res) => {
  connection.query(
    "UPDATE playlist SET ? WHERE id = ?",
    [req.body, req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send({
          error: err.message,
          sql: err.sql,
        });
      } else {
        connection.query(
          "SELECT id, title, genre FROM playlist WHERE id = ?",
          [req.params.id],
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
    }
  );
});

router.delete("/:id1/tracks/:id2", (req, res) => {
  connection.query(
    "UPDATE track SET playlist_id = NULL WHERE playlist_id = ? AND id = ?",
    [req.params.id1, req.params.id2],
    (err, results) => {
      if (err) {
        res.status(500).send({
          error: err.message,
          sql: err.sql,
        });
      } else {
        connection.query(
          "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track WHERE id = ?",
          [req.params.id2],
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
    }
  );
});

router.put("/:id1/tracks/:id2", (req, res) => {
  connection.query(
    "UPDATE track SET ? WHERE playlist_id = ? AND id = ?",
    [req.body, req.params.id1, req.params.id2],
    (err, results) => {
      if (err) {
        res.status(500).send({
          error: err.message,
          sql: err.sql,
        });
      } else {
        connection.query(
          "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track WHERE id = ?",
          [req.params.id2],
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
    }
  );
});

router.get("/", (req, res) => {
  connection.query("SELECT id, title, genre FROM playlist", (err, results) => {
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
  });
});

module.exports = router;
