const routerUser = require('express').Router();
const connection = require('./config')

//en tant qu'utilisateur, je veux créer et affecter un morceau à une user.
routerUser.post('/', (req,res) => {
  console.log(req.body)
      if (!req.body) {
        return res.status(422).send('erreur ');
      }
      return connection.query('INSERT INTO user SET ?', req.body, (err, results) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
            sql: err.sql,
          });
        }
        return connection.query('SELECT * FROM user WHERE id = ?', results.insertId, (err2, records) => {
            if (err2) {
            return res.status(500).json({
              error: err2.message,
              sql: err2.sql,
            });
          }
          const inserteduser = records[0];
          const host = req.get('host');
          const location = `http://host${req.url}/${inserteduser.id}`;
          return res
            .status(201)
            .set('Location', location)
            .json(inserteduser);
        });
      });
    },
    );
  

  module.exports = routerUser;