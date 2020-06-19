const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'ddojsioc69&SQL', // le mot de passe
database :  'checkpoint', // le nom de la base de données
});
module.exports = connection;