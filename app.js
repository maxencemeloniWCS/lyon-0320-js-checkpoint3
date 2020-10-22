const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
    


const playlistRouter = require('./routes/playlist');

app.use('/playlist', playlistRouter);


app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      });