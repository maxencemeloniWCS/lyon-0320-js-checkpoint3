const express = require('express')
const app = express()
const port = 3000
const connection = require('./conf')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// TO TEST LAUNCH NODEMON INDEX.JS AND GO TO TEST.HTTP FILE TO TEST

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

app.delete('/playlist/:id/track/:id', (req, res) => {
  connection.query('delete from track where id = ?', req.params.id, err => {
    if (err) {
      res.status(500).send('Error deleting the track')
    } else {
      res.sendStatus(200)
    }
  })
})

app.put('/playlist/:id/track/:id', (req, res) => {
  connection.query('update track set ? where id = ?', [req.body, req.params.id], err => {
    if (err) {
      res.status(500).send('Error editing the track')
    } else {
      res.status(200).send(req.body)
    }
  })
})

app.get('/playlists', (req, res) => {
  connection.query('select * from playlist', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving playlists')
    } else {
      res.status(200).send(results)
    }
  })
})

app.get('/tracks', (req, res) => {
  connection.query('select * from track', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving tracks')
    } else {
      res.status(200).send(results)
    }
  })
})

app.get('/playlists', (req, res) => {
  let sql = 'select * from playlist'
  const sqlValues = []
  if (req.query.title) {
    sql += 'where title = ?'
    sqlValues.push(req.query.title)
  }
  if (req.query.genre) {
    sql += 'where genre = ?'
    sqlValues.push(req.query.genre)
  }
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`)
    } else {
      res.json(results)
    }
  })
})

app.get('/tracks', (req, res) => {
  let sql = 'select * from track'
  const sqlValues = []
  if (req.query.title) {
    sql += 'where title = ?'
    sqlValues.push(req.query.title)
  }
  if (req.query.artist) {
    sql += 'where artist = ?'
    sqlValues.push(req.query.artist)
  }
  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`)
    } else {
      res.json(results)
    }
  })
})

app.post('/user', (req, res) => {
  connection.query('insert into user set ?', req.body, (err, results) => {
    if (err) {
      res.status(500).send("Error creating user");
    } else {
      res.status(200).send(req.body)
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...')
  }
  console.log(`Server is listening on ${port}`)
})