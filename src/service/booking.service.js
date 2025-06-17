const db = require("../models");

exports.deleteBooking = async (userId, bookingId) => {
    const booking = await db.Booking.findOne({ where: { id: bookingId, userId } });
    if (!booking) throw new Error("Booking not found");

    // Mark slot as available again
    await db.Slot.update({ isBooked: false }, { where: { id: booking.slotId } });

    await booking.update({ status: 'cancelled' });

    return { message: "Booking cancelled" };
};


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



exports.getBookedSlotsByCarpenter = async (carpenterId, date) => {
    const whereClause = {
        carpenterId,
        isBooked: true,
    };

    if (date) {
        whereClause.date = date; // Filter only if date is provided
    }

    console.log(whereClause)

    return db.Slot.findAll({
        where: whereClause,
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
