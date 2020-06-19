const Track = require('../models/track.model')

class TrackController {
  static async getSome(req, res) {
    const {search} = req.query
    const tracks = await Track.searchByTitleOrArtist(search)
    res.send(tracks)
  }
}

module.exports = TrackController