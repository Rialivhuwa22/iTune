const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticationMiddleware');
const musicController = require('../controllers/musicController');

// Route to fetch music data from iTunes API
router.get('/api/music', authenticateJWT, musicController.getMusicData);

module.exports = router;
