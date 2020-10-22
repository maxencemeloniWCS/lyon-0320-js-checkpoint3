const mysql = require('mysql');
module.exports = mysql.createConnection({
    user: 'root',
    password: '7290',
    host: 'localhost',
    database: 'playlist_db'
});