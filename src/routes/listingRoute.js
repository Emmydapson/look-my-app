// routes/listingRoutes.js
import express from 'express';
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
} from '../controllers/listingController.js';
import { authenticateToken } from '../middleware/auth.js';
import uploadFiles from '../middleware/uploadMiddleware.js'; // Import the upload middleware

const router = express.Router();

// Use upload middleware for file uploads when creating a listing
router.post('/', authenticateToken, uploadFiles, createListing);

// Get all listings with pagination
router.get('/', authenticateToken, getListings);

// Get a single listing by ID
router.get('/:id', authenticateToken, getListingById);

// Update a listing
router.put('/:id', authenticateToken, updateListing);

// Delete a listing
router.delete('/:id', authenticateToken, deleteListing);

export default router;
