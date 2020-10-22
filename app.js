const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./datasource/mysql');


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const playlistRouter = require('./routes/playlist');
const trackRouter = require('./routes/track');

app.use('/playlist', playlistRouter);
app.use('/track', trackRouter);

//BONUS 1

app.get('/playlists', (req,res)=>{
    db.query('SELECT title, genre FROM playlist', (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/tracks', (req,res)=>{
    db.query('SELECT title, artiste, playlist_id FROM track', (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});