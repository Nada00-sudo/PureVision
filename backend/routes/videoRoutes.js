const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Attention : NE PAS réécrire /api/videos ici
router.get('/', videoController.getAllVideos); 
router.get('/:id', videoController.getVideoById);

module.exports = router;