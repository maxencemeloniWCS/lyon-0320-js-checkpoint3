const express = require("express");
const router = express.Router();
const db = require("../mysql/mysql");

router.get("/", function (req, res) {
  res.send("Arbre");
});

router.get("/playlist/:id", function (req, res) {
  const id = parseInt(req.params.id);
  db.query(
    "SELECT title, genre FROM playlist WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        res.status(500).send({ message: "Erreur" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

router.get("/playlistTracks/:id", function (req, res) {
  const id = parseInt(req.params.id);
  db.query(
    "SELECT track.title, track.artist, track.album_picture, track.youtube_url FROM track JOIN playlist ON track.playlist_id=?",
    [id],
    (err, results) => {
      if (err) {
        res.status(500).send({ message: "Erreur", err });
      } else {
        res.status(200).send(results);
      }
    }
  );
});
router.get("/allPlaylists", function (req, res) {
  if (req.query.title === undefined && req.query.genre === undefined) {
    db.query("SELECT title, genre FROM playlist", (err, results) => {
      if (err) {
        res.status(500).send({ message: "Erreur" });
      } else {
        res.status(200).send(results);
      }
    });
  } else {
    db.query(
      `SELECT title, genre FROM playlist WHERE title LIKE '%${req.query.title}%' OR genre LIKE '%${req.query.genre}%'`,
      (err, results) => {
        if (err) {
          res.status(500).send({ message: "Erreur", err });
        } else {
          res.status(200).send(results);
        }
      }
    );
  }
});

router.get("/allTracks", function (req, res) {
  if (req.query.name === undefined && req.query.title === undefined) {
    db.query(
      "SELECT track.title, track.artist, track.album_picture, track.youtube_url FROM track",
      (err, results) => {
        if (err) {
          res.status(500).send({ message: "Erreur", err });
        } else {
          res.status(200).send(results);
        }
      }
    );
  } else {
    db.query(
      `SELECT track.title, track.artist, track.album_picture, track.youtube_url FROM track WHERE title LIKE '%${req.query.title}%' OR artist LIKE '%${req.query.artist}%'`,
      (err, results) => {
        if (err) {
          res.status(500).send({ message: "Erreur", err });
        } else {
          res.status(200).send(results);
        }
      }
    );
  }
});
router.post("/createPlaylist", function (req, res) {
  const title = req.body.title;
  const genre = req.body.genre;
  db.query(
    "INSERT INTO playlist (title, genre) VALUES (?)",
    [[title, genre]],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Erreur" });
      } else {
        res.status(200).send({ message: "post confirmed", results });
      }
    }
  );
});

router.post("/addTrack", function (req, res) {
  db.query(
    "INSERT INTO track (playlist_id, title, artist, album_picture, youtube_url) VALUES (?)",
    [
      [
        req.body.playlist_id,
        req.body.title,
        req.body.artist,
        req.body.album_picture,
        req.body.youtube_url,
      ],
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Erreur" });
      } else {
        res.status(200).send({ message: "track add", results });
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  db.query(
    "DELETE FROM playlist WHERE id = ?",
    parseInt(req.params.id),
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.delete("/delTrackPlaylist/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query("DELETE FROM track WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur", err);
    } else {
      res.status(200).send("morceau supprimé!");
    }
  });
});

router.put("/renamePlaylist/:id", (req, res) => {
  db.query(
    "UPDATE playlist SET ? WHERE id = ?",
    [req.body, parseInt(req.params.id)],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur", err);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

router.put("/updateTrack/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const form = req.body;
  db.query("UPDATE track SET ? WHERE id = ?", [form, id], (err) => {
    if ((err, results)) {
      console.log(err);
      res.status(500).send("Erreur", err);
    } else {
      res.status(200).send(results);
    }
  });
});

module.exports = router;
