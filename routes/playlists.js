const express = require("express");
const router = express.Router();
const db = require("../database/mysql");

//find
router.get("/", function (req, res) {
  db.query("SELECT title, genre FROM playlist", (err, results) => {
    if (err) {
      res.status(500).send("Server issue", err);
    } else {
      res.send(results);
    }
  });
});

//findone
router.get("/:id", (req, res) => {
  db.query("", (err, results) => {
    if (err) {
    } else {
    }
  });
});

//add

//delete

//update

module.exports = router;
