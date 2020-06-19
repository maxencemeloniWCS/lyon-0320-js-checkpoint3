const express = require('express');
const trackRouter = express.Router()
const TrackController = require('../controllers/track.controller')

trackRouter.get('/', TrackController.getSome)

module.exports = trackRouter