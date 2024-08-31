import express from 'express';
import { registerUser, loginUser, logoutUser, verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser); // Add this route
router.post('/verify-token', verifyToken); // Add this route

export default router;
