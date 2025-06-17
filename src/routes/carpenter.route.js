const express = require("express");
const router = express.Router();
const CarpenterController = require("../controllers/carpenter.controller");

// Create a new carpenter
router.post("/", CarpenterController.createCarpenter);

// Get all carpenters
router.get("/", CarpenterController.getAllCarpenters);

// Get available slots for a carpenter
router.get("/:id/slots", CarpenterController.getCarpenterSlots);

module.exports = router;
