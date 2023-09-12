import express from 'express';
import { generateOrder, fetchUserOrders } from '../controllers/order.js';

const router = express.Router();

router.post( '/', generateOrder );
router.get( '/:userId', fetchUserOrders );

export default router;
