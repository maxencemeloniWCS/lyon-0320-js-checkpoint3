const mysql = require('mysql');
require('dotenv').config(); 
const connexion = mysql.createConnection({
    user:  process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE
});

module.exports = connexion; 