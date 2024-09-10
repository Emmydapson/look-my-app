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

// Public routes for mobile app to fetch listings
router.get('/', getListings); // Fetch all listings (no auth)
router.get('/:id', getListingById); // Fetch a specific listing (no auth)

// Admin routes (protected)
router.post('/', authenticateToken, uploadFiles, createListing); // Create a new listing
router.put('/:id', authenticateToken, updateListing); // Update a listing
router.delete('/:id', authenticateToken, deleteListing); // Delete a listing

export default router;
