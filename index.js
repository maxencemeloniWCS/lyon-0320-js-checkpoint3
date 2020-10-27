require("dotenv").config();

const express = require("express");
const connection = require("./db");
const bodyParser = require("body-parser");
const playlists = require("./routes/playlists");
const tracks = require("./routes/track");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/playlists", playlists);
app.use("/tracks", tracks);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${process.env.PORT}`);
});
