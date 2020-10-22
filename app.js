const express = require("express");
const app = express();
const port = 3001;

const playlistRouter = require("./routes/playlists");
const songsRouter = require("./routes/songs");

app.use("/playlists", playlistRouter);
// app.use("/songs", songsRouter);

app.listen(port, () => {
  console.log(`App is listening on port:${port}`);
});
