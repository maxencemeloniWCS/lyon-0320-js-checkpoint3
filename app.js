const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const playlistRouter = require('./routes/playlist');
const trackRouter = require('./routes/track');

app.use('/playlist', playlistRouter);
app.use('/track', trackRouter);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});