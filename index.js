require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/playlists", (req, res) => {
  connection.query("select * from playlist", (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    } else {
      res.json(results);
    }
  });
});

//- en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
app.post("/api/playlists", (req, res) => {
  // récupération des données envoyées

  return connection.query(
    "INSERT INTO cp3.playlist SET ?",
    req.body,
    (err, results) => {
      console.log("ok");
      if (err) {
        // If an error has occurred, then the client is informed of the error
        return res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      }
      return connection.query(
        "SELECT * FROM cp3.playlist WHERE id = ?",
        results.insertId,
        (err2, records) => {
          if (err2) {
            return res.status(500).json({
              error: err2.message,
              sql: err2.sql,
            });
          }
          const insertedplaylist = records[0];
          // Extract all the fields *but* password as a new object (user)
          const { ...playlist } = insertedplaylist;
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get("host");
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${playlist.id}`;
          return res.status(201).set("Location", location).json(playlist);
          // connexion à la base de données, et insertion de l'employé
        }
      );
    }
  );
});
//- en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).

app.get("/api/playlists/:id", (req, res) => {
  // send an SQL query to get all employees
  connection.query(
    "SELECT * FROM playlist WHERE id = ?",
    req.params.id,
    (err, results) => {
      if (err) {
        // If an error has occurred, then the client is informed of the error
        res.status(500).send(`An error occurred: ${err.message}`);
      }
      if (results.length === 0) {
        return res.status(404).send(" req.params.id; not found");
      }
      {
        // If everything went well, we send the result of the SQL query as JSON
        res.json(results[0]);
      }
    }
  );
});
/* - en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist. +1
- en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist. +0.5 
- en tant qu'utilisateur, je veux pouvoir supprimer une playlist. +1
- en tant qu'utilisateur, je veux pouvoir modifier une playlist. +1 
- en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.
- en tant qu'utilisateur, je veux modifier un morceau d'une playlist. */

//en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.
app.get("/api/tracks", (req, res) => {
  connection.query("select * from track", (err, results) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/tracks", (req, res) => {
  // récupération des données envoyées

  return connection.query(
    "INSERT INTO cp3.track SET ?",
    req.body,
    (err, results) => {
      console.log("ok");
      if (err) {
        // If an error has occurred, then the client is informed of the error
        return res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      }
      return connection.query(
        "SELECT * FROM cp3.track WHERE id = ?",
        results.insertId,
        (err2, records) => {
          if (err2) {
            return res.status(500).json({
              error: err2.message,
              sql: err2.sql,
            });
          }
          const insertedtrack = records[0];
          // Extract all the fields *but* password as a new object (user)
          const { ...track } = insertedtrack;
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get("host");
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${track.id}`;
          return res.status(201).set("Location", location).json(track);
          // connexion à la base de données, et insertion de l'employé
        }
      );
    }
  );
});

//- en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.

// POURQUOI CA NE MARCHE PAS
app.get("/api/tracks", (req, res) => {
  let sql = "SELECT * FROM track";
  const sqlValues = [];
  if (req.query.playlist_id) {
    sql += " WHERE playlist_id  = ?";
    sqlValues.push(req.query.playlist_id);
  }
  // send an SQL query to get all employees
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      // If an error has occurred, then the client is informed of the error
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      // If everything went well, we send the result of the SQL query as JSON
      res.json(results);
    }
  });
});

app.get("/api/tracks", (req, res) => {
  let sql = "SELECT * FROM track";
  const sqlValues = [];
  if (req.query.playlist_id) {
    sql += " WHERE playlist_id = ?";
    sqlValues.push(req.query.playlist_id);
  }
  // send an SQL query to get all employees
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      // If an error has occurred, then the client is informed of the error
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      // If everything went well, we send the result of the SQL query as JSON
      res.json(results);
    }
  });
});

//en tant qu'utilisateur, je veux pouvoir supprimer une playlist.

app.delete("/api/playlists/:id", (req, res) => {
  const IdPlaylist = req.params.id;
  // TODO supprimer les données (étape 2)
  connection.query("DELETE FROM playlist WHERE id = ?", [IdPlaylist], (err) => {
    // TODO envoyer une réponse au client (étape 3)
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'une playlist");
    } else {
      res.sendStatus(200);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir modifier une playlist.

app.put("/api/playlists/:id", (req, res) => {
  const IdPlaylist = req.params.id;
  const formData = req.body;
  // send an SQL query to get all users
  return connection.query(
    "UPDATE  playlist SET ? WHERE id = ?",
    [formData, IdPlaylist],
    (err, results) => {
      if (err) {
        // If an error has occurred, then the client is informed of the error
        return res.status(500).json({
          error: err.message,
          sql: err.sql,
        });
      }
      return connection.query(
        "SELECT * FROM playlist WHERE id = ?",
        req.params.id,
        (err2, records) => {
          if (err2) {
            return res.status(500).json({
              error: err2.message,
              sql: err2.sql,
            });
          }
          const host = req.get("host");
          const { ...playlist } = records[0];
          const location = `http://${host}${req.url}/${playlist.id}`;
          return res.status(200).set("Location", location).json(playlist);
        }
      );
    }
  );
});
// en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.
("RIP");
// en tant qu'utilisateur, je veux modifier un morceau d'une playlist.
("RIP");

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${process.env.PORT}`);
});
