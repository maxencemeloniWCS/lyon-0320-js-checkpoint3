require("dotenv").config();
const express = require("express");
const app = express();
const port = 1234;

// support du json dans le body de la requête
app.use(express.json());
// support du format url-encoded dans le body de la requête
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/playlists", require("./playlist.routes.js"));
app.use("/tracks", require("./track.routes.js"));

app.listen(port, (err) => {
  if (err) {
    throw new Error("Somthing bad happenned...");
  }

  console.log(`server is running on http://localhost:${port}`);
});
