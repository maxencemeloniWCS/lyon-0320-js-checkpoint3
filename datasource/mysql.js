const mysql = require('mysql');
const dotenv = require('dotenv').config();
module.exports = mysql.createConnection({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE
});
// erreur dans ma console qui disait que connection.query is not a function, réponse apporter par stackoverflow
connection.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });

