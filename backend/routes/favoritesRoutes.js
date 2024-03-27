const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticationMiddleware');
const favoritesController = require('../controllers/favoritesController');

// Route to get favorites for the authenticated user
router.get('/api/favorites', authenticateJWT, favoritesController.getUserFavorites);

// Route to add a new favorite
router.post('/api/favorites', authenticateJWT, favoritesController.addFavorite);

// Route to remove a favorite by ID
router.delete('/api/favorites/:id', authenticateJWT, favoritesController.removeFavorite);

module.exports = router;
