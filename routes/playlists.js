const express = require("express");
const router = express.Router();
const connection = require("../db");
const sqlError = require("../utils/errorSql");

router.post("/", (req, res) => {
  connection.query("INSERT INTO playlist SET ?", [req.body], (err, results) => {
    if (err) {
      sqlError(res, err);
    } else {
      connection.query(
        "SELECT id, title, genre FROM playlist WHERE title = ?",
        [req.body.title],
        (err, results) => {
          if (err) {
            sqlError(res, err);
          } else {
            res.status(201).json(results);
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
        sqlError(res, err);
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
        sqlError(res, err);
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
        sqlError(res, err);
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
        sqlError(res, err);
      } else {
        connection.query(
          "SELECT id, title, genre FROM playlist WHERE id = ?",
          [req.params.id],
          (err, results) => {
            if (err) {
              sqlError(res, err);
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
        sqlError(res, err);
      } else {
        connection.query(
          "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track WHERE id = ?",
          [req.params.id2],
          (err, results) => {
            if (err) {
              sqlError(res, err);
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
        sqlError(res, err);
      } else {
        connection.query(
          "SELECT id, playlist_id, title, artist, album_picture, youtube_url FROM track WHERE id = ?",
          [req.params.id2],
          (err, results) => {
            if (err) {
              sqlError(res, err);
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
  if (req.query.title) {
    connection.query(
      "SELECT id, title, genre FROM playlist WHERE title = ?",
      [req.query.title],
      (err, results) => {
        if (err) {
          sqlError(res, err);
        } else if (results != "") {
          res.status(200).json(results);
        } else {
          res.sendStatus(404);
        }
      }
    );
  } else if (req.query.genre) {
    connection.query(
      "SELECT id, title, genre FROM playlist WHERE genre = ?",
      [req.query.genre],
      (err, results) => {
        if (err) {
          sqlError(res, err);
        } else if (results != "") {
          res.status(200).json(results);
        } else {
          res.sendStatus(404);
        }
      }
    );
  } else {
    connection.query(
      "SELECT id, title, genre FROM playlist",
      (err, results) => {
        if (err) {
          sqlError(res, err);
        } else if (results != "") {
          res.status(200).json(results);
        } else {
          res.sendStatus(404);
        }
      }
    );
  }
});

module.exports = router;
