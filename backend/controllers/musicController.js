// Import the 'axios' library for making HTTP requests
const axios = require('axios');

// iTunes API endpoint URL
const ITUNES_API_ENDPOINT = 'https://itunes.apple.com/search';

// Route handler to get music data from the iTunes API
const getMusicData = async (req, res) => {
  try {
    // Extract the 'term' query parameter from the request
    const query = req.query.term;

    // Extract the 'mediaType' query parameter from the request or default to 'music'
    const mediaType = req.query.mediaType || 'music';

    // Extract the 'Authorization' header from the request
    const token = req.header('Authorization');

    // Make a GET request to the iTunes API
    const response = await axios.get(ITUNES_API_ENDPOINT, {
      // Specify query parameters
      params: {
        term: query,           // Search term
        media: mediaType,      // Type of media (defaulted to 'music' if not provided)
      
      },
      headers: {
        Authorization: token,  // Include the JWT token in the request headers for authentication
      },
    });

    // Check if the iTunes API request was not successful
    if (response.status !== 200) {
      console.error('iTunes API request failed with status:', response.status);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Map the results from the iTunes API response to a simplified format
    const musicData = response.data.results.map((result) => ({
      name: result.collectionName || result.trackName, // Adjusted to handle different result structures
      artistName: result.artistName,
      cover: result.artworkUrl100,
      releaseDate: result.releaseDate,
    }));

    // Respond with the formatted music data
    res.json(musicData);
  } catch (error) {
    // Handle errors that occurred during the process
    console.error('Error fetching music data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the route handler for getting music data
module.exports = {
  getMusicData,
};
