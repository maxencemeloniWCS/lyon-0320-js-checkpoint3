const express = require('express');
const router = express.Router();
const db = require('../datasource/mysql');

router.post('/',(req,res)=>{
    db.query('INSERT INTO track SET ?', req.body, (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(`You have created the track ${JSON.stringify(req.body.title)} in playlist ${JSON.stringify(req.body.playlist_id)}`)
        }
    })
})

router.get('/:id', (req,res)=>{
    const playlistId = req.params.id
    db.query('SELECT title, artiste FROM track WHERE playlist_id=?', [playlistId], (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(result)
        }
    })
})

router.delete('/:id',(req,res)=>{
    db.query('DELETE FROM track WHERE id=?', req.params.id, (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(`track ${req.params.id} deleted`)
        }
    })
})

router.put('/:id', (req,res)=>{
    db.query('UPDATE track SET ? WHERE id=?', [req.body, req.params.id], (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(`You have update ${JSON.stringify(req.body)} in track number ${req.params.id}`)
        }
    })
})

//BONUS - FILTER

router.get('/', (req,res)=>{
    const title = req.query.title;
    db.query('SELECT title, artiste FROM track WHERE title = ?', title, (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.send(result)
        }
    })
})

module.exports = router;