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

router.post('/',(req,res)=>{
    db.query('INSERT INTO playlist SET ?', req.body, (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(result)
        }
    })
})

router.delete('/:id',(req,res)=>{
    db.query('DELETE FROM playlist WHERE id=?', req.params.id, (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(`Playlist ${req.params.id} deleted`)
        }
    })
})

router.put('/:id', (req,res)=>{
    db.query('UPDATE playlist SET ? WHERE id=?', [req.body, req.params.id], (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(result)
        }
    })
})


module.exports = router;