const express = require('express');
const router = express.Router();


const bookingController = require('../app/controllers/bookingContoller');
const resetController = require('../app/controllers/resetController');

router.route('/book').post(bookingController.createBooking);
router.route('/reset').post(resetController.resetCarDetails)

module.exports = router;
