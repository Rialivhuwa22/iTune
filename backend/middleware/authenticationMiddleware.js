const jwt = require('jsonwebtoken');

// Load the JWT secret key from the environment variables
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware function to authenticate JWT token
const authenticateJWT = (req, res, next) => {
  // Extract the token from the request header
  const token = req.header('Authorization');

  // If token is not provided, return 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, (err, user) => {
    // If there's an error verifying the token, return 403 Forbidden error
    if (err) {
      console.error('Error decoding token:', err);
      return res.status(403).json({ error: 'Forbidden - Invalid Token' });
    }

    // Attach the decoded user information to the request object
    req.user = user;
    
    // Call the next middleware function
    next();
  });
};

module.exports = authenticateJWT;
