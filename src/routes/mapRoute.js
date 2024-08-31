import express from 'express';
import {
  createMap,
  getMaps,
  getMapById,
  updateMap,
  deleteMap,
  getGoogleMapsApiKey,
} from '../controllers/mapController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Routes
router.post('/', authenticateToken, createMap); // Handle city addition
router.get('/', getMaps); // Get all maps
router.get('/:id', getMapById); // Get map by ID
router.put('/:id', authenticateToken, updateMap); // Update map
router.delete('/:id', authenticateToken, deleteMap); // Delete map
router.get('/api-key', authenticateToken, getGoogleMapsApiKey); // Fetch Google Maps API Key

export default router;
