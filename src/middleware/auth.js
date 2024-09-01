import jwt from 'jsonwebtoken';

// Middleware to authenticate token from headers
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.warn('No token provided in headers for authentication'); // Log warning for missing token
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Invalid token:', err.message); // Log error if token is invalid
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};
