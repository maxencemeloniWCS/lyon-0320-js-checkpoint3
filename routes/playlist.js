const express = require("express");
const router = express.Router();

const mysql = require("../datasource/mysql");

router.get("/", (req, res) => {
  res.send("Welcome to the playlist page");
});

// en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
router.post("/", (req, res) => {
  let request = "INSERT INTO playlist SET ?";
  mysql.query(request, req.body, (err, result) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      mysql.query(
        "SELECT id, title, genre FROM playlist WHERE id = ?",
        result.insertId,
        (err2, result2) => {
          if (err2) {
            res.status(500).send({ err2 });
          } else {
            res.send({ "A new playlist has been created ": result2 });
          }
        }
      );
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir consulter une playlist
// en renseignant son id dans l'url (juste ses données propres,
// pas les pistes associées).

router.get("/:id", (req, res) => {
  let request = `SELECT id, title, genre FROM playlist WHERE id=?`;
  mysql.query(request, req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.send(result);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir supprimer une playlist.
router.delete("/:id", (req, res) => {
  let request = "DELETE FROM playlist WHERE id=?";
  mysql.query(request, req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.send(`The playlist with id ${req.params.id} has been deleted`);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir modifier une playlist.
router.put("/:id", (req, res) => {
  let request = `UPDATE playlist SET ? WHERE id=?`;
  mysql.query(request, [req.body, req.params.id], (err, result) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      mysql.query(
        "SELECT id, title, genre FROM playlist WHERE id = ?",
        req.params.id,
        (err2, result2) => {
          if (err2) {
            res.status(500).send({ err2 });
          } else {
            res.send({ "the playlist has been modified ": result2 });
          }
        }
      );
    }
  });
});

module.exports = router;
