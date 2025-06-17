const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = require("./src/models");

db.sequelize.sync();

app.use(cors());
app.use(express.json());
app.use("/auth", require("./src/routes/auth.route"));
app.use("/bookings", require("./src/routes/booking.route"));
app.use("/carpenters", require("./src/routes/carpenter.route"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));