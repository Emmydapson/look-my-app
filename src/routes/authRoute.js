import express from 'express';
import { registerUser, loginUser, logoutUser, verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/verify-token', verifyToken); // Changed to GET for token verification

export default router;
