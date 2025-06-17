const db = require("../models");

// exports.createBooking = async (userId, slotId) => {
//     const slot = await db.Slot.findOne({ where: { id: slotId } });
//     if (!slot) throw new Error("Slot not found");
//     if (slot.isBooked) throw new Error("Slot already booked");

//     // Update slot as booked
//     await slot.update({ isBooked: true });

//     const booking = await db.Booking.create({
//         id: Date.now().toString(),
//         userId,
//         slotId,
//         status: "confirmed"
//     });

//     return { message: "Slot booked successfully", booking };
// };

// exports.getMyBookings = async (userId) => {
//     const bookings = await db.Booking.findAll({
//         where: { userId },
//         include: [{ model: db.Slot, include: [db.Carpenter] }]
//     });

//     return bookings;
// };

// exports.deleteBooking = async (userId, bookingId) => {
//     const booking = await db.Booking.findOne({ where: { id: bookingId, userId } });
//     if (!booking) throw new Error("Booking not found");

//     // Mark slot as available again
//     await db.Slot.update({ isBooked: false }, { where: { id: booking.slotId } });

//     await booking.destroy();

//     return { message: "Booking cancelled" };
// };


exports.createBooking = async ({ userId, carpenterId, time, date }) => {
    if (!time || !date) throw new Error("Both time and date are required");

    // 1. Create a slot (assume same time slot for a carpenter is unique per date)
    const [slot, created] = await db.Slot.findOrCreate({
        where: {
            carpenterId,
            startTime: time,
            date,
        },
        defaults: {
            isBooked: true,
        }
    });

    // 2. If slot already exists and is booked, throw error
    if (!created && slot.isBooked) throw new Error("Slot already booked");

    // 3. If slot existed but wasn’t booked, mark it as booked
    if (!created && !slot.isBooked) {
        await slot.update({ isBooked: true });
    }

    // 4. Create booking entry
    const booking = await db.Booking.create({
        // id: Date.now().toString(),
        userId,
        carpenterId,
        slotId: slot.id,
        status: "confirmed"
    });

    return { message: "Booking confirmed", booking };
};



exports.getBookedSlotsByCarpenter = async (carpenterId) => {
    return db.Slot.findAll({
        where: {
            carpenterId,
            isBooked: true,
        },
    });
};


exports.getUserBookings = async (userId) => {
    return db.Booking.findAll({
        where: { userId },
        include: {
            model: db.Slot,
            include: {
                model: db.Carpenter,
            },
        },
    });
};
