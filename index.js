const express = require('express');
const app = express();
const port = 8000;
const connection = require('./conf');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/playlist', (req, res) => {
    connection.query('SELECT * from playlist', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la playlist');
        } else {
            res.json(results);
        }
    });
});

app.get('/track', (req, res) => {
    const formData = req.body[0];
    connection.query('SELECT * from track', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération');
        } else {
            res.json(results);
        }
    });
});

app.post('/playlist', (req, res) => {
    const formData = req.body[0];
    connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erreur lors de la sauvegarde');
        } else {
            res.sendStatus(200);
        }
    })
});

app.get('/playlist/:id', (req, res) => {
    const idPlaylist = req.body[0]
    connection.query('SELECT * from playlist WHERE id = ?', [idPlaylist], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la playlist');
        } else {
            res.json(results);
        }
    });
});

app.get('/playlist/name', (req, res) => {
    connection.query('SELECT * from playlist WHERE name = ?', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la playlist');
        } else {
            res.json(results);
        }
    });
});


app.delete('/playlist/:id', (req, res) => {
    const idPlaylist = req.body.id;
    connection.query('DELETE FROM playlist WHERE id = ?', [idPlaylist], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression");
        } else {
            res.sendStatus(200);
        }
    });
});

app.put('/playlist/:id', (req, res) => {
    const idPlaylist = req.body.id;
    const formData = req.body;
    connection.query('UPDATE playlist SET ? WHERE id = ?', [formData, idPlaylist], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification");
        } else {
            res.sendStatus(200);
        }

    });
});

app.delete('/track/:id', (req, res) => {
    const idTrack = req.body.id;
    connection.query('DELETE * FROM track WHERE id = ?', [idTrack], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification du film");
        } else {
            res.sendStatus(200);
        }

    });
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
});