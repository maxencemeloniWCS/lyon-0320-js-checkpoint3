const db = require('../db')

class Track {
  static async searchByTitleOrArtist(searchTerm) {
    let sql = 'SELECT * from track '
    if (searchTerm) sql += `WHERE artist = ${db.escape(searchTerm)} OR title = ${db.escape(searchTerm)}`
    return db.query(sql)
  }
}

module.exports = Track