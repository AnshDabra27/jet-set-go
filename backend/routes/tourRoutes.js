const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

// Public routes
router.get('/', getAllTours);
router.get('/:id', getTourById);

// Admin-only routes
router.post('/', [auth, admin], createTour);
router.put('/:id', [auth, admin], updateTour);
router.delete('/:id', [auth, admin], deleteTour);

module.exports = router;
