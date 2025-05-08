const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createBooking,
  getUserBookings,
  getSingleBooking,
  cancelBooking,
} = require('../controllers/bookingController');

// Create booking
router.post('/', auth, createBooking);

// Get user's bookings
router.get('/my-bookings', auth, getUserBookings);

// Get single booking
router.get('/:id', auth, getSingleBooking);

// Cancel booking
router.delete('/:id', auth, cancelBooking);

module.exports = router;
