const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const playlistRouter = require("./routes/playlist");
const trackRouter = require("./routes/track");

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/playlist", playlistRouter);
app.use("/track", trackRouter);

app.listen(port, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`Server is listening on ${port}`);
});
