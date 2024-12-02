import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utils/constants.js';

const authenticate = (req, res, next) => {
  try {
    // Get token from headers
    let token = req.headers.authorization;

    if (!token) {
      console.error('Token missing');
      return res.status(401).json({ error: 'Unauthorized Access: No token provided' });
    }

    // Remove "Bearer " part of the token (if present)
    token = token.split(' ')[1];

    // Check if token is valid
    if (!token) {
      console.error('Token format invalid');
      return res.status(401).json({ error: 'Unauthorized Access: Invalid token format' });
    }

    // Verify token
    const user = jwt.verify(token, SECRET_KEY);
    req.userId = user.id;
    req.email = user.email;

    console.log("Authenticated User ID:", req.userId); // Debug log

    // Continue to the next middleware
    return next();

  } catch (error) {
    // Catch token verification errors and log them
    console.error(`Error during authentication: ${error.message}`);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Unauthorized Access: Invalid or expired token' });
    }

    // Generic error handler for unexpected errors
    return res.status(500).json({ error: 'Internal Server Error: Something went wrong' });
  }
};

export default authenticate;
