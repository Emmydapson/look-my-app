import express from 'express';
import { createListing, getListings, getListingById, updateListing, deleteListing } from '../controllers/listingController.js';
import multer from 'multer';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Adjust as needed

// Use upload middleware for file uploads
router.post('/listings', authenticateToken, upload.fields([{ name: 'coverImage' }, { name: 'logo' }]), createListing);
router.get('/listings', authenticateToken, getListings);
router.get('/listings/:id', authenticateToken,getListingById);
router.put('/listings/:id', authenticateToken, updateListing);
router.delete('/listings/:id', authenticateToken, deleteListing);

export default router;
