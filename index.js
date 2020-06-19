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

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${process.env.PORT}`);
});
