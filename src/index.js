import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import listingRoutes from './routes/listingRoute.js';
import mapRoutes from './routes/mapRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';  // Import fileURLToPath from 'url' module

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Use CORS middleware to handle cross-origin requests
app.use(cors({
  origin: '*', // Replace with your frontend's URL
  credentials: true, // Enable sending credentials
}));

// Parse JSON requests
app.use(express.json());

// Default route for root path
app.get('/', (req, res) => {
  res.send('Server is up and running.');
});

// Set up route handlers
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/categories', categoryRoutes);

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
