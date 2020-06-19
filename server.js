const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/playlists', require('./routes/playlist.routes.js'));
app.use('/tracks', require('./routes/track.routes.js'))


const server = app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

module.exports = server;