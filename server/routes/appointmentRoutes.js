const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getMyAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', authorize('patient'), bookAppointment);
router.get('/my', getMyAppointments);
router.patch('/:id/status', authorize('doctor', 'admin'), updateAppointmentStatus);

module.exports = router;