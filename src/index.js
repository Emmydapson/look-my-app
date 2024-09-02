import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import listingRoutes from './routes/listingRoute.js';
import mapRoutes from './routes/mapRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Use CORS middleware to handle cross-origin requests
app.use(cors({
  origin: 'https://restaurant-admin-dashboard-ve23.vercel.app', // Replace with your frontend's URL
  credentials: true, // Enable sending credentials
}));

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
