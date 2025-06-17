const db = require("../models");

exports.getAllCarpenters = async () => {
    return await db.Carpenter.findAll({
        attributes: ["id", "name", "phone", "createdAt"]
    });
};

exports.getCarpenterSlots = async (carpenterId) => {
    const carpenter = await db.Carpenter.findByPk(carpenterId);
    if (!carpenter) throw new Error("Carpenter not found");

    const slots = await db.Slot.findAll({
        where: {
            carpenterId,
            isBooked: false
        },
        order: [["startTime", "ASC"]]
    });

    return slots;
};



exports.createCarpenter = async (data) => {
    return await db.Carpenter.create(data);
};
