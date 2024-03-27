// Initialize an array to store user favorites
const favorites = [];

// Route handler to get user favorites
const getUserFavorites = (req, res) => {
  // Filter favorites for the current user
  const userFavorites = favorites.filter((fav) => fav.userId === req.user.name);
  // Respond with the user's favorites
  res.json(userFavorites);
};
// Route handler to add a favorite
const addFavorite = (req, res) => {
  // Destructure values from the request body
  const { name, artistName, cover, releaseDate } = req.body;

  // Check for missing required fields
  if (!name || !artistName || !cover || !releaseDate) {
    return res.status(400).json({ error: 'Bad Request - Missing required fields' });
  }

  // Create a new favorite object
  const newFavorite = {
    id: favorites.length + 1,
    userId: req.user.name,
    name,      
    artistName,
    cover,     
    releaseDate,
  };

  // Add the new favorite to the favorites array
  favorites.push(newFavorite);

  // Respond with the new favorite
  res.json(newFavorite);
};


// Route handler to remove a favorite
const removeFavorite = (req, res) => {
  // Extract the 'id' parameter from the request
  const { id } = req.params;

  // Find the index of the favorite in the array
  const index = favorites.findIndex((fav) => fav.userId === req.user.name && fav.id === parseInt(id));

  // Check if the favorite is not found
  if (index === -1) {
    return res.status(404).json({ error: 'Not Found - Favorite not found' });
  }

  // Remove the favorite from the array
  favorites.splice(index, 1);

  // Respond with success message
  res.json({ success: true });
};

// Export the favorite-related route handlers
module.exports = {
  getUserFavorites,
  addFavorite,
  removeFavorite,
};
