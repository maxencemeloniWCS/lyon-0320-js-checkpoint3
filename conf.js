const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'p3ujr8ah', // le mot de passe
database :  'music', // le nom de la base de données
});
module.exports = connection;