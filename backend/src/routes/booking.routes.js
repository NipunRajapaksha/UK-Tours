import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { adminOnly } from '../middleware/roles.js';
import { createBooking, getBookings } from '../controllers/booking.controller.js';

const router = Router();

router.post('/', createBooking); // customers can book without login if they have email
router.get('/', auth, adminOnly, getBookings);

export default router;
