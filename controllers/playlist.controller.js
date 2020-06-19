const Playlist = require('../models/playlist.model')

class PlaylistController {
  static async addTrack(req, res) {
    const {id} = req.params;
    const {title, artist, album_picture, youtube_url} = req.body
    const existingPlaylist = await Playlist.findById(id)
    if (!existingPlaylist) {
      return res.status(404).send({error: 'playlist not found'})
    }
    const created = await Playlist.addTrack(id, {title, artist, album_picture, youtube_url})
    res.status(201).send(created)
  }

  static async updateTrack(req, res) {
    const {id, track_id} = req.params;
    const {title, artist, album_picture, youtube_url} = req.body
    const existingPlaylist = await Playlist.findById(id)
    if (!existingPlaylist) {
      return res.status(404).send({error: 'playlist not found'})
    }

    const existingTrack = await Playlist.findTrackById(id, track_id)
    if (!existingTrack) {
      return res.status(404).send({error: 'track not found'})
    }

    const updated = await Playlist.updateTrack(id, track_id, {title, artist, album_picture, youtube_url})
    res.send(updated)
  }

  static async deleteTrack(req, res) {
    const {id, track_id} = req.params;
    
    const existingPlaylist = await Playlist.findById(id)
    if (!existingPlaylist) {
      return res.status(404).send({error: 'playlist not found'})
    }

    const existingTrack = await Playlist.findTrackById(id, track_id)
    if (!existingTrack) {
      return res.status(404).send({error: 'track not found'})
    }

    await Playlist.deleteTrack(id, track_id)
    res.sendStatus(204)
  }

  static async getTracks(req, res) {
    const {id} = req.params;
    const existingPlaylist = await Playlist.findById(id)
    if (!existingPlaylist) {
      return res.status(404).send({error: 'playlist not found'})
    }
    const tracks = await Playlist.getTracks(id)
    res.send(tracks)
  }

  static async create(req, res) {
    const {title, genre} = req.body
    const created = await Playlist.create({title, genre})
    res.status(201).send(created)
  }

  static async updateOne(req, res) {
    const {title, genre} = req.body
    const {id} = req.params;
    const existingPlaylist = await Playlist.findById(id)
    if (!existingPlaylist) {
      return res.sendStatus(404)
    }
    const updated = await Playlist.update(id, {title, genre})
    res.send(updated)
  }

  static async getOne(req, res) {
    const {id} = req.params;
    const playlist = await Playlist.findById(id)
    res.send(playlist)
  }

  static async deleteOne(req, res) {
    const {id} = req.params;
    const existingPlaylist = await Playlist.findById(id)
    if (!existingPlaylist) {
      return res.sendStatus(404)
    }
    await Playlist.deleteById(id)
    res.sendStatus(204)
  }
}

module.exports = PlaylistController