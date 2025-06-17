const { Sequelize } = require("sequelize");
const config = require("../../config");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require("./user.model")(sequelize, Sequelize);
db.Carpenter = require("./carpenter.model")(sequelize, Sequelize);
db.Slot = require("./slot.model")(sequelize, Sequelize);
db.Booking = require("./booking.model")(sequelize, Sequelize);

// Associations

// User ↔ Booking
db.User.hasMany(db.Booking, { foreignKey: 'userId' });
db.Booking.belongsTo(db.User, { foreignKey: 'userId' });

// Carpenter ↔ Slot
db.Carpenter.hasMany(db.Slot, { foreignKey: 'carpenterId' });
db.Slot.belongsTo(db.Carpenter, { foreignKey: 'carpenterId' });

// Slot ↔ Booking
db.Slot.hasOne(db.Booking, { foreignKey: 'slotId' });
db.Booking.belongsTo(db.Slot, { foreignKey: 'slotId' });

// Sync DB (safe in dev mode)
// sequelize.sync({ alter: true   });
// sequelize.sync({ alter: true, force: false });

module.exports = db;
