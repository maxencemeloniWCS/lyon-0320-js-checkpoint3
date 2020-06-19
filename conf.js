const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost', // adresse du serveur
  port: '3306',
  user: 'root', // le nom d'utilisateur
  password: 'Kosifev69!', // le mot de passe
  database: 'checkpoint' // le nom de la base de données
});
module.exports = connection;