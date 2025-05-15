// routes/bookings.js
const express = require('express');
const router = express.Router();
const { bookAppointment, getBookingHistory } = require('../controllers/bookingcontroller');

router.post('/', bookAppointment);
router.get('/:userId', getBookingHistory);

module.exports = router;


