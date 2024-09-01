import express from 'express';
import { createListing, getListings, getListingById, updateListing, deleteListing } from '../controllers/listingController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Adjust as needed

// Use upload middleware for file uploads
router.post('/listings', upload.fields([{ name: 'coverImage' }, { name: 'logo' }]), createListing);
router.get('/listings', getListings);
router.get('/listings/:id', getListingById);
router.put('/listings/:id', updateListing);
router.delete('/listings/:id', deleteListing);

export default router;
