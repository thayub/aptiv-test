const express = require('express');
const router = express.Router();



const bookingController = require('../app/controllers/bookingContoller');
router.route('/book').post(bookingController.createBooking);

module.exports = router;
