module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'cancelled'),
      defaultValue: 'confirmed'
    }
  }, {});

  Booking.associate = models => {
    Booking.belongsTo(models.Slot, {
      foreignKey: 'slotId'
    });

    Booking.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  return Booking;
};
