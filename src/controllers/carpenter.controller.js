const CarpenterService = require("../service/carpenter.service");

exports.getAllCarpenters = async (req, res) => {
    console.log("here");
    try {
        const carpenters = await CarpenterService.getAllCarpenters();
        res.json(carpenters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCarpenterSlots = async (req, res) => {
    try {
        const { id } = req.params;
        const slots = await CarpenterService.getCarpenterSlots(id);
        res.json(slots);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createCarpenter = async (req, res) => {
    try {
        const carpenter = await CarpenterService.createCarpenter(req.body);
        res.status(201).json(carpenter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
