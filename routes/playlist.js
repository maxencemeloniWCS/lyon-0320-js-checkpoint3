const express = require('express');
const connection = require('./datasource/mysql.js');
const router = express.Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM playlist', (err, results) => {
      if (err) {
        res.send(err);
      }else{
        res.status(200).json(results)
      }
    })
  });

// OUI en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.

router.post('/', (req, res) => {
    const { title, genre } = req.body;
  
      connection.query('INSERT INTO playlist SET ?', req.body, (err, results) => {
        if(err) {
          res.status(500).send(err)
        } else {
          res.status(201).json(results)
            }
          })
        });

// OK en tant qu'utilisateur, je veux pouvoir consulter une playlist en renseignant son id dans l'url (juste ses données propres, pas les pistes associées).
router.get('/:id', (req, res) => {
    const playlistId = req.params.id
    connection.query('SELECT * FROM playlist WHERE id=?', playlistId, (err, results) => {
      if (err){
        res.status(500).send(err)
      }else{
        res.status(200).json(results)
      }
    })
  });

 // NON en tant qu'utilisateur, je veux créer et affecter un morceau à une playlist


// OUI en tant qu'utilisateur, je veux lister tous les morceaux d'une playlist.
router.get('/:id/tracks', (req, res) => {
const idPlaylist = req.params.id
    connection.query('SELECT * FROM track WHERE playlist_id = ?', idPlaylist, (err, results) => {
      if(err){
        res.status(500).send(err)
      } else {
        res.status(200).json(results)
      }
    })
  });
  
// OUI en tant qu'utilisateur, je veux pouvoir supprimer une playlist.
  router.delete('/:id', (req, res) => {
    const idPlaylist = req.params.id
    connection.query('DELETE FROM playlist WHERE id=?', idPlaylist, (err, result) => {
      if(err){
        res.status(500).send(err);
      }else{
        res.status(204);
        
      }
    })
  });
  
//OUI en tant qu'utilisateur, je veux pouvoir modifier une playlist.
  router.put('/:id', (req, res) => {
    const idPlaylist = req.params.id
  
    connection.query('UPDATE playlist SET ? WHERE id=?', [req.body, idPlaylist], (err, results) => {
      if(err) {
        res.status(500).send(err);
      }else{
        connection.query('SELECT * FROM playlist WHERE id=?', idPlaylist, (err, results) => {
          if (err){
            res.status(500).send(err)
          } else {
            res.status(200).json(results)
          }
        })
      }
    })
  });


//NON En tant qu'utilisateur, je veux supprimer un morceau d'une playlist

//OUI en tant qu'utilisateur, je veux modifier un morceau d'une playlist.
router.put('/:id/tracks/:id_track', (req, res) => {
    const idTrack = req.params.id_track
  
    connection.query('UPDATE track SET ? WHERE id=?', [req.body, idTrack], (err, results) => {
      if (err) {
        res.status(500).send(err)
      } else {
        connection.query('SELECT * FROM track WHERE id=?', idTrack, (err, results) => {
          if(err){
            res.status(500).send(err)
          }else{
            res.status(200).json(results)
          }
        })
      }
    })
  });
  

module.exports=router
    
