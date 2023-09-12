import express from 'express';
import { registerNewUser, verifyEmail, login, fetchAddresses, addAddress, fetchUserProfile } from '../controllers/user.js';

const router = express.Router();

router.post( '/register', registerNewUser );
router.get( '/verify/:token', verifyEmail );
router.post( '/login', login );
router.get( '/address/:userId', fetchAddresses );
router.post( '/address', addAddress );
router.get( '/profile/:userId', fetchUserProfile );

export default router;
