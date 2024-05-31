const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Track = require('../models/track.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========
router.use(verifyToken);


//Create
router.post('/', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const track = await Track.create(req.body);
      track._doc.author = req.user;
      res.status(201).json(track);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });


//Index
router.get('/', async (req, res) => {
    try {
      const tracks = await Track.find({})
      res.status(200).json(tracks);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  //Show
  router.get('/:trackId', async (req, res) => {
    try {
        const track = await Track.findById(req.params.trackId)
        res.status(200).json(track);
      } catch (error) {
        res.status(500).json(error);
      }
  });

  
  //Edit
  router.put('/:trackId', async (req, res) => {
    try {
      // Find the track:
      const track = await Track.findById(req.params.trackId);
  
      // Check permissions:
      if (!track.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      // Update track:
      const updatedTrack = await Track.findByIdAndUpdate(
        req.params.trackId,
        req.body,
        { new: true }
      );
  
  
      // Issue JSON response:
      res.status(200).json(updatedTrack);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // Delete
  router.delete('/:trackId', async (req, res) => {
    try {
      const track = await Track.findById(req.params.trackId);
  
      if (!track.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedTrack = await Track.findByIdAndDelete(req.params.trackId);
      res.status(200).json(deletedTrack);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  module.exports = router