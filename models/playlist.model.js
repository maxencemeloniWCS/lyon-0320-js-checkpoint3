const db = require('../db')

class Palylist {
  static async create({title, genre}) {
    return db.query('INSERT INTO playlist (title, genre) VALUES (?, ?)', [title, genre]).then(res => {
      return {id: res.insertId, title, genre}
    })
  }

  static async update(id, {title, genre}) {
    return db.query('UPDATE playlist SET title=?, genre=? WHERE id=?', [title, genre, id]).then(res => {
      return {id, title, genre}
    })
  }

  static async findById(id) {
    return db.query('SELECT * FROM playlist WHERE id=?', [id]).then(res => res[0])
  }

  static async findTrackById(playlist_id, track_id) {
    return db.query('SELECT * FROM track WHERE playlist_id=? AND id=?', [track_id, playlist_id]).then(res => res[0])
  }

  static async deleteById(id) {
    return db.query('DELETE FROM playlist WHERE id=?', [id])
  }

  static async addTrack(playlist_id, {title, artist, album_picture, youtube_url}) {
    return db.query('INSERT INTO track (title, artist, album_picture, youtube_url, playlist_id) VALUES (?, ?, ?, ?, ?)', 
      [title, artist, album_picture, youtube_url, playlist_id]
    ).then(res => {
      return {id: res.insertId, title, artist, album_picture, youtube_url, playlist_id}
    })
  }

  static async updateTrack(playlist_id, track_id, {title, artist, album_picture, youtube_url}) {
    return db.query('UPDATE track SET title=?, artist=?, album_picture=?, youtube_url=? WHERE playlist_id=? AND id=?', 
      [title, artist, album_picture, youtube_url, playlist_id, track_id]
    ).then(res => {
      return {id: track_id, title, artist, album_picture, youtube_url, playlist_id}
    })
  }

  static async deleteTrack(playlist_id, track_id) {
    return db.query('DELETE FROM track WHERE playlist_id=? AND id=?', 
      [playlist_id, track_id]
    )
  }

  static async getTracks(playlist_id) {
    return db.query('SELECT * from track WHERE playlist_id=?', 
      [playlist_id]
    )
  }
}

module.exports = Palylist