const express = require('express');
const app = express();
const port = 3000;
const db = require('./datasource/mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});

app.get("/", function(req, res){
    res.send('All good')
})

//en tant qu'utilisateur, je veux pouvoir créer une nouvelle playlist.
app.post('/playlist', (req, res) => {
    const formData = req.body;
    console.log(formData);
    db.query(`INSERT INTO playlist SET ?`, [formData], (err, results) => {
  
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'une playlist");
      } else {
        res.sendStatus(200);
      }
    });
  });