require('dotenv').config();
const mysql = require('mysql');

class Database {
  init () {
    this.connection = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '3306',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'checkpoint3',
      connectionLimit: 10
    });

    return this;
  }

  async query (...args) {
    return new Promise((resolve, reject) => {
      this.connection.query(...args, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  escape(something) {
    return this.connection.escape(something)
  }

  buildWhereClauseEq(params) {
    let clause = ''
    Object.keys(params).forEach(key => {
      const val = params[key]
      if (val) {
        if (clause === '') clause = `WHERE ${key}=${this.escape(val)}`;
        else clause += `AND ${key}=${this.escape(val)}`
      }
    })
    return clause
  } 
}

module.exports = (new Database()).init();