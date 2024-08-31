import express from 'express';
import { 
  createMap, 
  getMaps, 
  getMapById, 
  updateMap, 
  deleteMap,
  getGoogleMapsApiKey
} from '../controllers/mapController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createMap);
router.get('/', getMaps);
router.get('/:id', getMapById);
router.put('/:id', authenticateToken, updateMap);
router.delete('/:id', authenticateToken, deleteMap);
router.get('/api-key', authenticateToken, getGoogleMapsApiKey);
export default router;