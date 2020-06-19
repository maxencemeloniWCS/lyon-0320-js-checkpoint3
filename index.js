
const express = require('express');
const app = express();
const routerPlaylist = require('./routerPlaylist');
const routerTrack = require('./routerTrack');
const connection = require('./config')
const port = 7777;

// const router= app.Router();
app.use(express.json());
// Support URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}));  

app.use('/playlist',routerPlaylist);
app.use('/track',routerTrack);




app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});