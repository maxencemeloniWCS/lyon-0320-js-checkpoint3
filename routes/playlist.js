const { Router } = require('express');
const db= require('../datasource/connection')
const router = Router();



/* POST - Create new playlist */
router.post('/', (req, res) => {

  const {title,genre} = req.body
fields= [[title,genre]]

db.query ("INSERT INTO playlist (title,genre) VALUES ?", [fields], (err,result) => {

  if(err) {
    res.status(400).json({ message : err});
  } else {
  res.status(200).json(req.body)
  }
})

});


/* GET- Consulter une playlist en renseigant son ID */
router.get('/:id', (req, res) => {

 idPlaylist = req.params.id

  db.query ("SELECT * FROM playlist WHERE id=?", idPlaylist, (err,result) => {

    if(err) {
      res.status(400).json({ message : err});
    } else {
      res.status(200).json(result)
    }
  })

});

/* DELETE Supprimer une playlist */
router.delete('/:id', (req, res) => {

  idPlaylist = req.params.id

  db.query ("DELETE  FROM playlist WHERE id=?", idPlaylist, (err,result) => {

    if(err) {
      res.status(400).json({ message : err});
    } else {
      res.status(200).json(result)
    }
  })

});


/* PUT Modifier une playlist */
router.put('/:id', (req, res) => {

  const idPlaylist = req.params.id
  const {title,genre} = req.body
const fields= {
    title: title,
  genre: genre
}
  db.query ("UPDATE  playlist  SET ? WHERE id=?", [fields,idPlaylist], (err,result) => {

    if(err) {
      res.status(400).json({ message : err});
    } else {
      res.status(200).json(result)
    }
  })

});





module.exports = router;
