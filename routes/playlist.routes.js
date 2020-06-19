const express = require('express');
const playlistRouter = express.Router()
const PlaylistController = require('../controllers/playlist.controller')

playlistRouter.post('/', PlaylistController.create)
playlistRouter.get('/:id', PlaylistController.getOne)
playlistRouter.patch('/:id', PlaylistController.updateOne)
playlistRouter.delete('/:id', PlaylistController.deleteOne)

playlistRouter.post('/:id/tracks', PlaylistController.addTrack)
playlistRouter.patch('/:id/tracks/:track_id', PlaylistController.updateTrack)
playlistRouter.delete('/:id/tracks/:track_id', PlaylistController.deleteTrack)
playlistRouter.get('/:id/tracks', PlaylistController.getTracks)

module.exports = playlistRouter