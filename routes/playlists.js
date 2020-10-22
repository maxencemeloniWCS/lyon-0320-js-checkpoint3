const express = require("express");
const router = express.Router();
const db = require("../database/mysql");

//find (bonus)
router.get("/", function (req, res) {
  db.query("SELECT id, title, genre FROM playlist", (err, results) => {
    if (err) {
      res.status(500).send("Server issue:" + err);
    } else {
      res.json(results);
    }
  });
});

//findone
router.get("/:id", (req, res) => {
  const playlistId = req.params.id;
  db.query(
    "SELECT id, title, genre FROM playlist WHERE id=?",
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
  db.query("INSERT INTO playlist SET ?", [datas], (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      db.query(
        "SELECT title, genre FROM playlist WHERE id=?",
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
  const playlistId = req.params.id;
  db.query("DELETE FROM playlist WHERE id=?", [playlistId], (err, results) => {
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
  const playlistId = req.params.id;
  db.query(
    "UPDATE playlist SET ? WHERE id=?",
    [datas, playlistId],
    (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        db.query(
          "SELECT title, genre FROM playlist WHERE id=?",
          [playlistId],
          (err, results) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send(results);
            }
          }
        );
      }
    }
  );
});

module.exports = router;
