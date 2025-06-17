const moment = require("moment");
const db = require("../models");
const BookingService = require("../service/booking.service");

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carpenterId, time, date } = req.body;

    if (!carpenterId) return res.status(400).json({ message: 'carpenterId is required' });

    const formattedTime = moment(time, 'hh:mm A').format('HH:mm:ss');

    const result = await BookingService.createBooking({ userId, carpenterId, time: formattedTime, date });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await BookingService.getUserBookings(userId);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookedSlotsByCarpenter = async (req, res) => {
  try {
    const { carpenterId } = req.params;
    const slots = await BookingService.getBookedSlotsByCarpenter(carpenterId);
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// exports.deleteBooking = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const result = await BookingService.deleteBooking(userId, id);
//     res.json(result);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
