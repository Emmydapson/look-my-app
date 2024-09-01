import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save new user to the database
    await newUser.save();

    // Respond with success (no token generation here)
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error); // Log the full error
    res.status(500).json({ error: 'Server error', details: error.message }); // Send more detailed error message
  }
};

// Verify JWT token (useful for checking user authentication status)
export const verifyToken = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(200).json({ message: 'Token is valid', user: decoded });
  });
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Set the token in an HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Error logging in user:', error); // Log the full error
    res.status(500).json({ error: 'Server error', details: error.message }); // Send more detailed error message
  }
};

// Logout a user
export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure secure clear in production
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
