const express = require('express');
const app = express();
const port = 3000;
const connection = require('./index');


//en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.

app.get('/api/playlists', (req, res) => {
  connection.query('SELECT * from playlist', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération de la playlist');
    } else {
      res.json(results);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).

app.get('/api/playlists/:id', (req, res) => {
    connection.query('SELECT id from playlist', (err, results) => {
   
      if (err) {
        res.status(404).send('Erreur lors de la playlist');
      } else {
        res.json(results);
      }
    });
  });
  


//en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.

app.get('/api/playlists/tracks/', (req, res) => {
  connection.query('SELECT track from playlist', (err, results) => {
    if (err) {
      
      res.status(500).send('Erreur lors de la récupération des morceaux de la palylist');
      
    } else {
      res.json(results);
    }
  });
});


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.


app.post('/api/playlists', (req, res) => {
  const formData = req.body; 
  console.log(req.body);
  
  connection.query('INSERT INTO playlist SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      
      res.status(500).send("Erreur lors de la sauvegarde d'une nouvelle playlist");
    } else {
      
      res.sendStatus(200);
    }
  });

});

//en tant qu'utilisateur, je veux pouvoir modifier une playlist

app.put('/api/playlists', (req, res) => {
    const formData = req.body; 
    console.log(req.body);
    
    connection.query('UPDATE playlist ', formData, (err, results) => {
      if (err) {
        console.log(err);
        
        res.status(500).send("Erreur lors de la modification de la  playlist");
      } else {
        
        res.sendStatus(200);
      }
    });
  
  });


// en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist.


app.post('/api/playlists/tracks', (req, res) => {
  const idPlaylist = req.params.id;
  const formData = req.body;
 
  connection.query('UPDATE playlist SET ? WHERE track = ?', [formData, idPlaylist], err => {
    if (err) {
      console.log(err);
    res.status(500).send("Erreur lors de la création d'un nouveau morceau sur une playlist");
  } else {
    res.sendStatus(200);
  }
  });
});


//  en tant qu'utilisateur, je veux supprimer un morceau d'une playlist.


app.delete('/api/playlists/tracks', (req, res) => {
  const idPlaylist = req.params.id;

  connection.query('DELETE FROM playlist WHERE track = ?', [idPlaylist], err => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un morceau d'une playlist");
    } else {

      res.sendStatus(200);
    }
  });
});

// en tant qu'utilisateur, je veux pouvoir supprimer une playlist.


app.delete('/api/playlists', (req, res) => {
        connection.query('DELETE * from playlist', (err, results) => {
          if (err) {
            res.status(500).send('Erreur lors de la suppréssion de la playlist');
          } else {
            res.json(results);
          }
        });
      });

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});