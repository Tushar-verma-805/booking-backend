module.exports = (sequelize, DataTypes) => {
  const Slot = sequelize.define('Slot', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    carpenterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    // endTime: {
    //   type: DataTypes.TIME,
    //   allowNull: false
    // },
    isBooked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});

  Slot.associate = models => {
    Slot.belongsTo(models.Carpenter, {
      foreignKey: 'carpenterId'
    });

    Slot.hasOne(models.Booking, {
      foreignKey: 'slotId'
    });
  };

  return Slot;
};

