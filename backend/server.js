// Load environment variables from .env file
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path');

// Import route handlers
const musicRoutes = require('./routes/musicRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');

// Create an Express application
const app = express();

// Define the port number (use process.env.PORT or default to 3001)
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Use route handlers for music and favorites
app.use(musicRoutes);
app.use(favoritesRoutes);

// Define a route for the root path ('/')
app.get('/', (req, res) => {
  res.send('Welcome to your API server!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
