const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/booking.controller");
const auth = require("../middlewares/auth"); // JWT middleware

router.post("/", auth, BookingController.createBooking);
// router.delete("/:id", auth, BookingController.deleteBooking);
router.get('/user',auth, BookingController.getUserBookings);
router.get('/carpenter/:carpenterId', BookingController.getBookedSlotsByCarpenter);

module.exports = router;
