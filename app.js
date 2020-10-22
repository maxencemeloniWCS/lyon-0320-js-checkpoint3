const express = require("express"); 
const app = express();
const port = 3000;
const connexion = require("./data/mysql"); 

app.get("/", (req, res) => {
    res.send("Bienvenu dans la Playlist"); 
}); 


//Récuperer la liste des toutes les pistes (tracks):

app.get("/tracks", (req, res) => {
    connexion.query("SELECT * FROM track", (err, result) => {
        if(err){
            res.status(500).send("erreur dans la recuperation de la liste des pistes")
        } else {
            res.json(result); 
            
        }
    })
})

// Reécuperer une piste par titre :

app.get("/tracks/:title", (req, res) => {
    const genres = req.params.title; 
    connexion.query("SELECT * FROM track WHERE genre = ? ", [genres], (err, result) => {
        if(err){
            res.status(500).send("erreur dans la recuperation de la liste des pistes")
        } else {
            res.json(result); 
            
        }
    })
})

// Récuperer les pistes par son son id: 

app.get("/tracks/:id", (req, res, next) => {
    const dataTracks = req.params.id;
    connexion.query("SELECT * FROM track WHERE id = ? ", [dataTracks], (err, result) => {
        if(err){
            res.status(500).send("erreur dans la recuperation de la piste")
        } else {
            res.json(result); 
        }
    })
}); 

//Récuperer la liste des toutes les playlists:

app.get("/playlists", (req, res) => {
    connexion.query("SELECT * FROM playList", (err, result) => {
        if(err){
            res.status(500).send("erreur dans la recuperation de la playlist")
        } else {
            res.json(result); 
            
        }
    })
})

// Récuperer une playList par son son id:

app.get("/playlists/:id", (req, res, next) => {
    const dataPlaylist = req.params.id;
    connexion.query("SELECT * FROM playList WHERE id = ? ", [dataPlaylist], (err, result) => {
        if(err){
            res.status(500).send("erreur dans la recuperation de la playlist")
        } else {
            res.json(result); 
        }
    })
}); 

// Ajouter une piste :

app.post("/tracks", (req, res) => {

    const dataForm = req.body;

    connexion.query("INSERT INTO track SET ?", dataForm, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde d'une piste");
        } else {
            res.sendStatus(200);
        }
    })
})
//Ajouter une playlist:

app.post("/playlists", (req, res) => {

    const dataForm = req.body;

    connexion.query("INSERT INTO playList SET ?", dataForm, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde d'une playlist");
        } else {
            res.sendStatus(200);
        }
    })
})

// modifier une piste :
app.put("/tracks/:id", (req, res)=> {
    const idTrack = parseInt(req.params.id);
    const dataTrack = req.body; 

    connexion.query("UPDATE track SET ? WHERE id = ?", [dataTrack, idTrack], (err, results) => {
        if(err){
            res.status(500).send("Erreur lors de la modification des données")
        } else {
            res.sendStatus(200)
        }
    })
})
// modifier une playlist:
app.put("/playlists/:id", (req, res)=> {
    const idPlaylist = parseInt(req.params.id);
    const dataPlaylist = req.body; 

    connexion.query("UPDATE playList SET ? WHERE id = ?", [dataPlaylist, idPlaylist], (err, results) => {
        if(err){
            res.status(500).send("Erreur lors de la modification des données")
        } else {
            res.sendStatus(200)
        }
    })
})

// supprimer une piste : 
app.delete("/tracks/:id", (req, res) => {

    const dataTrack = req.params.id;

    connexion.query("DELETE FROM track WHERE id = ?", dataTrack, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la supression d'une piste");
        } else {
            res.sendStatus(200);
        }
    })
})
// supprimer une playlist: 

app.delete("/playlists/:id", (req, res) => {

    const dataForm = req.params.id;

    connexion.query("DELETE FROM playList WHERE id = ?", dataForm, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la supression d'une playList");
        } else {
            res.sendStatus(200);
        }
    })
})



app.listen(port, (err) => {
    if (err) {
        throw new Error("Something bad happened...");
    }
    console.log(`Server is listening on ${port}`)
})
