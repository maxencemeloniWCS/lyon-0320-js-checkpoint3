const express = require('express')
const app = express()
const port = 3000
const connection = require('./conf')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/playlist', (req, res) => {
  connection.query('insert into playlist set ?', req.body, (err, results) => {
    if (err) {
      res.status(500).send('Error creating a new playlist')
    } else {
      res.status(200).send(req.body)
    }
  })
})

app.get('/playlist/:id', (req, res) => {
  connection.query('select * from playlist where id = ?', req.params.id, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving playlist')
    } else {
      res.status(200).send(results)
    }
  })
})

app.post('/track', (req, res) => {
  connection.query('insert into track set ?', req.body, (err, results) => {
    if (err) {
      res.status(500).send('Error adding new track')
    } else {
      res.status(200).send(req.body)
    }
  })
})

app.get('/playlist/:id/track', (req, res) => {
  connection.query('select * from playlist join track on playlist.id = track.playlist_id where playlist.id = ?', req.params.id, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving tracks')
    } else {
      res.status(200).send(results)
    }
  })
})

app.delete('/playlist/:id', (req, res) => {
  connection.query('delete from playlist where id = ?', req.params.id, err => {
    if (err) {
      res.status(500).send('Error deleting the playlist')
    } else {
      res.sendStatus(200)
    }
  })
})

app.put('/playlist/:id', (req, res) => {
  connection.query('update playlist set ? where id = ?', [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Error editing the playlist')
    } else {
      res.status(200).send(req.body)
    }
  })
})

app.delete('/track/:id', (req, res) => {
  connection.query('delete from track where id = ?', req.params.id, err => {
    if (err) {
      res.status(500).send('Error deleting the track')
    } else {
      res.sendStatus(200)
    }
  })
})

app.put('/track/:id', (req, res) => {
  connection.query('update track set ? where id = ?', [req.body, req.params.id], err => {
    if (err) {
      res.status(500).send('Error editing the track')
    } else {
      res.status(200).send(req.body)
    }
  })
})

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...')
  }
  console.log(`Server is listening on ${port}`)
})