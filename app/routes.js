const express = require('express');
const router = express.Router();


const bookingController = require('./controllers/bookingController');
const resetController = require('../app/controllers/resetController');
const tickController = require('../app/controllers/tickController')

router.route('/book').post(bookingController.createBooking);
router.route('/reset').put(resetController.resetCarDetails)
router.route('/tick').post(tickController.incrementTime);
router.route('/status').post(bookingController.currentState);

module.exports = router;
