const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/booking.controller");
const auth = require("../middlewares/auth"); // JWT middleware

router.post("/", auth, BookingController.createBooking);
// router.get("/", auth, BookingController.getMyBookings);
// router.delete("/:id", auth, BookingController.deleteBooking);

router.get('/user',auth, BookingController.getUserBookings);

// // GET /bookings/carpenter/:carpenterId - Get booked slots for a carpenter
router.get('/carpenter/:carpenterId', BookingController.getBookedSlotsByCarpenter);

module.exports = router;
