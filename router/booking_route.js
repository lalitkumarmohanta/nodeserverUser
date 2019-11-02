const express = require('express');
const router = express.Router();
const UserCtrl = require('../controller/user-ctrl');
const BookinCtrl = require('../controller/booking-ctrl');



router.post('/', UserCtrl.authMiddleWare, BookinCtrl.createBooking);

module.exports = router;