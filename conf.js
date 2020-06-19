const  mysql = require('mysql');
const  connection = mysql.createConnection({
  host :  'localhost', 
  user :  'root', 
  password :  'password', 
  database :  'checkpoint3', 
});
module.exports = connection;