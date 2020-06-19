require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const app = express();
const database = require('./conf');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

/* mysql> DESCRIBE playlist;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int          | NO   | PRI | NULL    | auto_increment |
| title | varchar(128) | NO   |     | NULL    |                |
| genre | varchar(128) | NO   |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
3 rows in set (0.03 sec)
mysql> DESCRIBE track;
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| id            | int          | NO   | PRI | NULL    | auto_increment |
| title         | varchar(128) | NO   |     | NULL    |                |
| artist        | varchar(128) | NO   |     | NULL    |                |
| album_picture | varchar(256) | NO   |     | NULL    |                |
| youtube_url   | varchar(128) | NO   |     | NULL    |                |
| playlist_id   | int          | NO   | MUL | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+
6 rows in set (0.01 sec) */


//GET sur la home
app.get('/', (req, res) => {
    res.send('Connecté!')
})

//connection a la base de donnée /playlist and /track
app.get('/playlist', (req, res) => {
    database.query('SELECT * FROM playlist', (error, results) => {
        if (error) {
            console.log(chalk.red.inverse('erreur a la récuperation de la playlist'));
            res.send(error)
        } else {
            console.log(chalk.green.inverse('Super tu as récuperer ta playlist'));
            res.send(results)
        }
    })
})


app.get('/track', (req, res) => {
    database.query('SELECT * FROM track', (error, results) => {
        if (error) {
            console.log(chalk.red.inverse('erreur a la récuperation de tes sons'));
            res.send(error);
        } else {
            console.log(chalk.green.inverse('Super tu as récuperer tes sons'));
            res.send(results);
        }
    })
})


//1.  POST - céer une nouvel playlist

app.post('/newPlaylist', (req, res) => {
    database.query('INSERT INTO playlist SET ?', req.body, (error, results) => {
        if (!error) {
            res.status(201).json(req.body);
        } else {
            res.status(400).send(error);
        }
    })
})




//2. Récuperer une playlist via son id dans l' url.

app.get('/playlist/:id', (req, res) => {
    database.query('SELECT * FROM playlist WHERE id =?', req.params.id, (error, results) => {
        if (!error) {
            res.status(201).json(req.body);
        } else {
            res.status(400).send(error);
        }
    })
})



//3. Poster un son dans la playlist
//200 status code - OK

app.post('/newSong', (req, res) => {
    database.query('INSERT INTO track SET ?', req.body, (error, results) => {
        if (!error) {
            res.status(200).json(req.body);
        } else {
            res.status(400).send(error);
        }
    })
})



//4. recuperer tous les sons de la playlist

app.get('/playlist/:playlistName', (req, res) => {
    database.query('SELECT id FROM playlist WHERE title=?', req.params.playlistName, (error, results) => {
        if (!error) {
            if (results.length === 0) {
                res.send('Pas de musique avec ce nom ')
            } else {
                const idPlaylist = results[0].id
                database.query('SELECT * FROM track WHERE playlist_id=?', idPlaylist, (error, results) => {
                    if (!error) {
                        res.status(200).json(results);
                    } else {
                        res.status(400).send(error);
                    }
                })
            }
        } else {
            res.send(error)
        }
    })
})


//5. Supprimer une playlist par son id
app.delete('/playlistDelete/:id', (req, res) => {
    database.query('DELETE FROM playlist WHERE id=?', req.params.id, (error, results) => {
        if (!error) {
            res.status(201);
        } else {
            res.status(400).send(error);
        }
    })
})


//6. modifier le nom d'un son dans une playlist.
app.put('/playlistModify/:playlistName', (req, res) => {
    database.query('UPDATE playlist SET ? WHERE title=?', [req.body, req.params.playlistName], (error, results) => {
        if (!error) {
            res.status(201).send(req.body);
        } else {
            res.status(400).send(error);
        }
    })
})



//7. Supprimer un son d'une playlist par son id
app.delete('/playlistDeleteSong/:idSong', (req, res) => {
    database.query('DELETE FROM track WHERE id?', req.params.idSong, (error, results) => {
        if (!error) {
            res.status(201);
        } else {
            res.status(400).send(error);
        }
    })
})


//8. Modifier un son d'une  playlist

app.put('/editSong/:idSong', (req, res) => {
    database.query('UPDATE track SET ? WHERE id=?', [req.body, req.params.idSong], (error, results) => {
        if (!error) {
            res.status(201).send(req.body)
        } else {
            res.status(400).send(error);
        }
    })
})





//Port 3000 
app.listen(3000, (error) => {
    if (error) {
        console.log(chalk.red.inverse('There is an error running app.listen'))
    } else {
        console.log(chalk.green.inverse('Connected and listening to the port 3000'))
    }
})