const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost',
user :  'camwild',
password :  'jecodewcs',
database :  'checkpoint3',
});
module.exports = connection;