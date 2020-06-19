const mysql = require('mysql');
const connection = mysql.createConnection({
	host : 'localhost',
	user: 'root', 
	port: 3306,
	password: "%*NphTz%Qa28#RcC",
	database: 'playlist_database',
});
module.exports = connection;