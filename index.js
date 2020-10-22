const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const db = mysql.createConnection({
	user: "root",
	password: "3P0XY@mysql",
	host: "localhost",
	database: "music"
});

app.get('/', (req, res) => {
	res.send('Hello World!')
})


//en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
app.post ('/addplaylist', (req, res)=>{
    const {title,genre}= req.body;
    const reqCreatePlaylist = `INSERT INTO playlist (title, genre) VALUES (${title},${genre})`;
    db.query (reqCreatePlaylist ,(err, results)=>{
        if (err){
            res.sendStatus(500).send ("erreur lors de l'insertion de données");
        }else{
            res.send(results);
        }
    })
});

//en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url 
//(juste ses données propres, pas les pistes associées).

app.get ('/:id',(req, res)=>{
    const id = req.params.id;
    const reqById = `SELECT (id, title, genre) FROM playlist WHERE id=?`;
    db.query (reqById,[id],(err, results)=>{
        if (err){
            res.sendStatus(500).send ("erreur lors de l'accès aux données");
        }else{
            res.json(results);
        }
    })
});


//en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.
app.post ('/addtitle',(req, res)=>{
    const {title,artist,album_picture,youtube_url, playlist_id} = req.body;
    const reqInserttitle =`INSERT INTO track (title,artist,album_picture,youtube_url, playlist_id) VALUES (${title}, ${artist},${album_picture},${youtube_url},${playlist_id}})`;
    db.query (reqInserttitle,(err, results)=>{
        if (err){
            res.sendStatus(500).send ("erreur lors de l'envoie du titre vers les données");
        }else{
            res.send(results);
        }
    })
});


//en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
app.get ('/alltitle/:id',(req, res)=>{
    const id = req.params.id;
    const reqList = "SELECT (title) FROM track INNER JOIN playlist ON track.playlist_id=playlist.id";
    db.query (reqList,(err, results)=>{
        if (err){
            res.sendStatus(500).send ("erreur lors de l'accès aux données");
        }else{
            res.json(results);
        }
    })
});

//en tant qu'utilisateur, je veux pouvoir supprimer une playlist.
app.delete('/deletePlaylist/:id', (req, res)=>{
    const id = req.params.id;
    const reqDeletePlaylist = `DELETE FROM playlist WHERE id=?`;
    db.query(reqDeletePlaylist,[id],(res, results)=>{
        if (err){
            res.sendStatus(500).send ("erreur lors de la suppression des données");
        }else{
            res.sendStatus(200);
        }
    })
});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})

