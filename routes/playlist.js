const express = require('express');
const router = express.Router();
const db = require('../datasource/mysql');

router.get('/:id', (req,res)=>{
    const playlistId = req.params.id
    db.query('SELECT id, title, genre FROM playlist WHERE id=?', [playlistId], (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(result)
        }
    })
})

router.post()

router.delete()

router.update()

module.exports = router;