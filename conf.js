const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost',
user :  '',
password :  '',
database :  'checkpoint3',
});
module.exports = connection;