require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const playlistsRouter = require("./routes/playlists");
const tracksRouter = require("./routes/tracks");
const usersRouter = require("./routes/users");

app.use("/playlists", playlistsRouter);
app.use("/tracks", tracksRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${process.env.PORT}`);
});
