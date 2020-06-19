const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'me', // le nom d'utilisateur
password :  'secret', // le mot de passe
database :  'my_db', // le nom de la base de données
});
module.exports = connection;