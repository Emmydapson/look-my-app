import express from 'express';
import { 
  createListing, 
  getListings, 
  getListingById, 
  updateListing, 
  deleteListing 
} from '../controllers/listingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createListing);
router.get('/', getListings);
router.get('/:id', getListingById);
router.put('/:id', authenticateToken, updateListing);
router.delete('/:id', authenticateToken, deleteListing);

export default router;
