module.exports = (sequelize, DataTypes) => {
  const Carpenter = sequelize.define('Carpenter', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {});

  Carpenter.associate = models => {
    Carpenter.hasMany(models.Slot, {
      foreignKey: 'carpenterId',
      onDelete: 'CASCADE'
    });
  };

  return Carpenter;
};
